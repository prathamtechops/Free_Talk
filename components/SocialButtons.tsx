import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "@/lib/actions/user.actions";
import { GoogleLogo } from "./icons";

export const SocialButtons = ({ type }: { type: "login" | "register" }) => {
  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <div className="grid gap-4">
      <Button
        onClick={handleGoogleLogin}
        variant="outline"
        className="w-full space-x-2"
        type="button"
      >
        <span>
          {type === "login" ? "Login with Google" : "Sign up with Google"}
        </span>
        <GoogleLogo />
      </Button>
    </div>
  );
};
