import React from 'react'

function unauthorisedperson() {
    return (
        <>
            <div className="min-h-screen w-full bg-[#080C14] flex flex-col items-center justify-center p-6 text-center select-none font-sans">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/5">
                    <Lock className="w-7 h-7" />
                </div>
                <h1 className="text-2xl font-bold text-slate-100 tracking-tight mb-2">Access Denied</h1>
                <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-6">
                    {requireAdmin
                        ? 'You need admin privileges to access this page.'
                        : 'Please log in to access this page.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <NavLink
                        to="/login"
                        className="inline-flex items-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-teal-400/10 cursor-pointer"
                    >
                        Go to Login
                    </NavLink>
                    <NavLink
                        to="/"
                        className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-2.5 rounded-xl text-xs transition-all border border-slate-700 cursor-pointer"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Return to Home</span>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default unauthorisedperson
