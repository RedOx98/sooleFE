'use client'
import { LoginUser } from "@/lib/actions"
import { NAVIGATION, User, USER_AUTHORITES } from "@/lib/definitions"
import { useRouter } from "next/navigation"
import { CSSProperties, useState } from "react"
import { BeatLoader } from "react-spinners"

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const LoginPage = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div>
                {/* Logo */}
                <div className="flex justify-center">
                    <p className="text-ecobankBlue text-[3rem] text-center border-b-[6px] border-b-ecobankGreen w-max font-Aladin-Regular leading-none">
                        Kiti
                    </p>
                </div>

                <div className="mt-8">
                    <Login />
                </div>

                <div className="sm:hidden">{/* blue logo */}</div>
                <div className="hidden sm:block">{/* white logo */}</div>
            </div>
        </div>
    );
};

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setErrorMessage] = useState<String>("");
    const [submissionPending, setSubmissionPending] = useState<boolean>(false);
    const router = useRouter();


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Set button pending state
        setSubmissionPending(true);

        // Clear error messages
        setErrorMessage("");

        if (!email || !password) {
            setErrorMessage("Incomplete credentials");
            return;
        }

        (async function () {
            try {
                const user: User = await LoginUser({ email, password });

                if (user) {
                    // Retrieve roles
                    const authorities = user.authorities.split(" ");

                    // Admin page
                    if (authorities.includes(USER_AUTHORITES.ADMIN)) {
                        router.push(NAVIGATION.ADMIN);
                        return;
                    }

                    // Admin page
                    if (authorities.includes(USER_AUTHORITES.CAPTAIN)) {
                        router.push(NAVIGATION.CAPTAIN);
                        return;
                    }


                    // User page
                    if (authorities.includes(USER_AUTHORITES.USER)) {
                        router.push(NAVIGATION.USER);
                        return;
                    }

                    // User page
                    throw new Error("User role not found!");
                }
            } catch (error) {
                setErrorMessage("Error validating credentials!");
                // Clear pending state
                setSubmissionPending(false);
            }
        })();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-xs text-right text-error">{error}</p>}
                <div className="flex flex-col gap-y-5 mt-5">
                    {/* Email */}
                    <div className="flex flex-col gap-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm"
                        >
                            Staff ID/Email Address
                        </label>
                        <input
                            required
                            className="outline-none w-[90vw] max-w-[340px] border focus:border-ecobankBlue focus:shadow focus:shadow-ecobankBlue p-2 rounded"
                            type="email"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="email" className="text-sm">
                            Password
                        </label>
                        <input
                            required
                            className="outline-none w-[90vw] max-w-[340px] border focus:border-ecobankBlue focus:shadow focus:shadow-ecobankBlue p-2 rounded"
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                </div>

                <button
                    className="bg-ecobankBlue rounded w-[90vw] max-w-[340px] py-3 mt-8 text-sm text-white focus:outline-none"
                    type="submit"
                    disabled={submissionPending}
                >
                    {" "}
                    {submissionPending ? (
                        <BeatLoader
                            color={"#ffffff"}
                            loading={true}
                            cssOverride={override}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    ) : (
                        "Log in"
                    )}
                </button>
            </form>
        </>
    );
};

export default LoginPage;
