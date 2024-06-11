import Button from "@/components/Button";
import Field from "@/components/Field";
import Input from "@/components/Input";
import Page from "@/components/Page";
import useSignIn from "@/hooks/useSignIn";
import { fetchJson } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC, useState } from "react";

interface signInProps {}

function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

const SignInPage: FC<signInProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { signIn, signInError, signInLoading } = useSignIn();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = await signIn(email, password);
    if (isValid) router.push("/");
  };

  return (
    <Page title='Sign In'>
      <form onSubmit={handleSubmit}>
        <Field label='Email'>
          <Input
            type='Email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Field>
        <Field label='Password'>
          <Input
            type='Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Field>
        {signInError && <p className='text-red-700'>Invalid Credentials</p>}
        {signInLoading ? (
          <p className='text-black-700'>Loading...</p>
        ) : (
          <Button type='submit'>Sign-In</Button>
        )}
      </form>
    </Page>
  );
};

export default SignInPage;
