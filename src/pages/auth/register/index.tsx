import AuthLayout from "@/components/layouts/AuthLayout";
import Register from "@/components/views/auth/register";

const RegisterPage = ()=> {
    return(
        <AuthLayout title="ACARA | Register">
            <Register/>
        </AuthLayout>
    )
}

export default RegisterPage