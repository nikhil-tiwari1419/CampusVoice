import React from 'react'

function unauthorisedperson() {
    return (
        <>
            <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-6 text-center select-none font-sans">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 text-amber-600 flex items-center justify-center mb-4 shadow-lg shadow-amber-200/20">
                    <Lock className="w-7 h-7" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Access Denied</h1>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mb-6">
                    {requireAdmin
                        ? 'You need admin privileges to access this page.'
                        : 'Please log in to access this page.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <NavLink
                        to="/login"
                        className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-teal-600/20 cursor-pointer"
                    >
                        Go to Login
                    </NavLink>
                    <NavLink
                        to="/"
                        className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-2.5 rounded-xl text-xs transition-all border border-slate-200 cursor-pointer"
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