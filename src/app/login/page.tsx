import Authform from "../../components/auth/AuthForm";

export default function LoginPage() {
    return (
      <main className="min-h-screen">
        <Authform forRegister={false} text="Login"/>
      </main>
    )
  }