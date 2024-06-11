import { User } from "@/lib/user";
import { fetchJson } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

interface SignInVariables {
    email: string;
    password: string;
}

interface UseSignInResult {
    signIn: (email: string, password: string) => Promise<boolean>;
    signInError: boolean;
    signInLoading: boolean;
}
export default function useSignIn(): UseSignInResult {
    const mutation = useMutation<User, Error, SignInVariables>({
        mutationFn: ({ email, password }) =>
            fetchJson("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }),
    });

    return {
        signIn: async (email, password) => {
            try {
                await mutation.mutateAsync({ email, password });
                return true;
            } catch (err) {
                return false;
            }
        },
        signInError: mutation.isError,
        signInLoading: mutation.isPending,
    }
}