import { useQuery } from "@apollo/client";
import { GET_USER } from "@graphql/users/queries";
import { User } from "@interfaces/users";
import { Button } from "@material-ui/core";
import { generateFeideLoginUrl } from "@utils/auth";
import Link from "next/link";
import { useMemo } from "react";
import { Skeleton } from "@material-ui/lab";
import { useRouter } from "next/router";

type Props = {
  redirect?: boolean;
  redirectPath?: string;
  children?: React.ReactNode;
  fallback?: React.ReactNode;
};

export const LoginRequired = ({ redirect, redirectPath, children, fallback }: Props) => {
  const router = useRouter();
  var path: string | undefined = undefined;
  if (redirect) {
    path = redirectPath || router.asPath;
  }
  const url = useMemo<string>(() => generateFeideLoginUrl(path), [path]);
  const { data, loading } = useQuery<{ user?: User }>(GET_USER);

  if (loading) {
    return (
      <Skeleton variant="rect">
        <Link href={url} passHref>
          <Button variant="contained" color="primary">
            Log inn
          </Button>
        </Link>
      </Skeleton>
    );
  }

  if (data?.user) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <Link href={url} passHref>
      <Button size="medium" variant="contained" color="primary">
        Logg inn
      </Button>
    </Link>
  );
};

export default LoginRequired;