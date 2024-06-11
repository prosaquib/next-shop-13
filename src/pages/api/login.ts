import { fetchJson } from '@/lib/utils';
import { NextApiHandler } from 'next'
import cookie from 'cookie';

const { CMS_URL } = process.env;
const handleLogin: NextApiHandler = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).end();
        return;
    }
    const { email, password } = req.body;
    try {
        const { jwt, user } = await fetchJson(`${CMS_URL}/auth/local`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                identifier: email,
                password,
            }),
        });
        res.status(200).
            setHeader(
                'Set-Cookie',
                cookie.serialize('jwt', jwt, {
                    httpOnly: true,
                    path: '/api',
                }))
            .json({
                id: user.id,
                name: user.username
            });
    } catch (err) {
        res.status(401).end();
    }
};

export default handleLogin;