import cookie from 'cookie';
import { NextApiHandler } from 'next';

const logout: NextApiHandler = (req, res) => {
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('jwt', '', {
            path: '/api',
            expires: new Date(0),
        })
    );
    res.status(200).json({});
}

export default logout;