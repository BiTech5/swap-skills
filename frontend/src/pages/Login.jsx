const Login=()=>{
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden ring-1 ring-slate-200">
                <div className="px-8 py-10 sm:px-10">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-semibold text-slate-900">Welcome Back</h1>
                        <p className="mt-2 text-sm text-slate-500">Sign in to continue to Swap Skills</p>
                    </div>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <label className="inline-flex items-center gap-2">
                                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-slate-600">Remember me</span>
                            </label>
                            <button type="button" className="text-blue-600 hover:text-blue-700 cursor-pointer">Forgot password?</button>
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                        >
                            Sign in
                        </button>
                    </form>
                    <div className="mt-8 text-center text-sm text-slate-500">
                        Don’t have an account? <button type="button" className="font-medium text-blue-600 hover:text-blue-700">Create one</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;