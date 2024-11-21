
import { jwtDecode } from 'jwt-decode';
import { serverFetch } from '@/app/action';
import { GET_PROFILE, GET_USER_BY_ID } from '@/app/queries';
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const token = cookies().get("session")?.value || "";

    if (!token) {
        redirect('/');
    }
    let payload: any = ""
    try {
        payload = jwtDecode(token);
    } catch (error) {
        redirect('/');
    }
    
    const response = await fetch(
        process.env.PLATFORM_BACKEND_URL!,
        {
            method: "POST",
            //@ts-ignore
            headers: {
                "content-type": "application/json",
                "session": cookies().get("session")?.value,
                "x_api_key": process.env.NEXT_PUBLIC_X_API_KEY
            },
            body: JSON.stringify({
                query: GET_USER_BY_ID,
                variables: {
                    where: {
                        id: {
                            is: payload?.user?.id
                        }
                    }
                },
            }),
            cache: "no-store"
        }
    );
    const profile = await response.json();
    
    if (profile?.data?.getUser?.profile?.name !== "SystemAdmin") {
        redirect('/');
    }
    return (
        <>
            {profile?.data?.getUser?.id ? <>{children}</> : "Validating User ...."}
        </>
    );
}
