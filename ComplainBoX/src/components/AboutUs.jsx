import { NavLink } from 'react-router-dom'
import { Target, Eye, ShieldCheck, Users, MessageSquareText, TrendingUp, ArrowRight, Sparkles, Zap, Heart, Award, Volume2, CheckCircle, Clock, Lock } from 'lucide-react'

function AboutUs() {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Anonymous & Secure',
      description: 'Your identity stays protected. Speak up without fear of consequences.',
      color: 'teal'
    },
    {
      icon: MessageSquareText,
      title: 'Transparent Process',
      description: 'Track every complaint from submission to resolution, in real time.',
      color: 'sky'
    },
    {
      icon: TrendingUp,
      title: 'Real Impact',
      description: 'Complaints are routed directly to the right department for faster action.',
      color: 'emerald'
    },
  ]

  const features = [
    {
      icon: Volume2,
      title: 'Amplify Your Voice',
      description: 'Be heard where it matters. Your concerns reach decision-makers directly.',
    },
    {
      icon: CheckCircle,
      title: 'Track Everything',
      description: 'Watch your complaint progress from filing to resolution in real-time.',
    },
    {
      icon: Clock,
      title: 'Fast Resolution',
      description: 'Average response within 24 hours. No more lost complaints.',
    },
    {
      icon: Lock,
      title: 'Complete Privacy',
      description: 'File anonymously. Your identity is encrypted and protected.',
    },
  ]

  const team = [
    {
      role: 'Student Council',
      desc: 'Oversees complaint categorization and escalation',
      icon: Users
    },
    {
      role: 'Administration',
      desc: 'Reviews and acts on department-level issues',
      icon: Target
    },
    {
      role: 'Tech Team',
      desc: 'Maintains and improves the CampusVoice platform',
      icon: Zap
    },
  ]

  const timeline = [
    { year: '2024', event: 'ComplainBoX Initiative Launched', desc: 'Started with a mission to give students a voice' },
    { year: '2024', event: 'CampusVoice Platform Developed', desc: 'Built with student feedback and modern tech' },
    { year: '2025', event: '500+ Complaints Resolved', desc: 'Real changes happening because students spoke up' },
    { year: '2026', event: 'Expanding to All Departments', desc: 'Growing campus-wide for maximum impact' },
  ]

  const stats = [
    { number: '500+', label: 'Complaints Resolved', icon: Award },
    { number: '95%', label: 'Resolution Rate', icon: TrendingUp },
    { number: '24h', label: 'Avg Response Time', icon: Clock },
    { number: '100%', label: 'Secure & Anonymous', icon: Lock },
  ]

  return (
    <div className="relative w-full bg-gradient-to-b from-[#080C14] via-[#0F172A] to-[#080C14] text-slate-100 font-sans overflow-hidden select-none">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-teal-500/15 to-transparent rounded-full blur-[150px] pointer-events-none opacity-60 animate-pulse" />
      <div className="absolute top-1/3 -right-[200px] w-[600px] h-[400px] bg-gradient-to-l from-emerald-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-[300px] w-[500px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Hero Section */}
      <section className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 pt-28 pb-20 sm:pb-28">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-500/40 text-teal-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md hover:border-teal-500/60 transition-all">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
          </span>
          <span>CampusVoice Platform</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-50 leading-tight tracking-tighter mb-8">
          Your Voice, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-300">
            Your Platform.
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-10 font-light">
          <span className="text-teal-400 font-semibold">CampusVoice</span> is a student-first platform under the <span className="text-emerald-400 font-semibold">ComplainBoX</span> initiative. Raise concerns about campus facilities, academics, or services — anonymously, securely, and with guaranteed action.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <NavLink
            to="/complain"
            className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-xl shadow-lg shadow-teal-500/40 hover:shadow-teal-500/60 transition-all text-base sm:text-lg"
          >
            <span>File a Complaint</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </NavLink>
          <NavLink
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-slate-800/60 hover:bg-slate-700/80 text-slate-100 font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-xl border border-slate-700/60 hover:border-slate-600 transition-all text-base sm:text-lg backdrop-blur-md"
          >
            <span>Learn More</span>
            <Sparkles className="w-4 h-4" />
          </NavLink>
        </div>

        {/* Hero decorative elements */}
        <div className="relative h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-50" />
      </section>

      {/* Stats Strip */}
      <section className="border-y border-slate-800/50 bg-gradient-to-r from-slate-900/40 via-teal-900/20 to-slate-900/40 backdrop-blur-xl py-16 sm:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 px-4 sm:px-6">
          {stats.map(({ number, label, icon: Icon }) => (
            <div key={label} className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/10 border border-teal-500/30 text-teal-400 mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-7 h-7" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-50 mb-2">{number}</p>
              <p className="text-sm sm:text-base text-slate-400 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* Mission */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-900/20 border border-teal-500/30 rounded-3xl p-10 sm:p-12 shadow-2xl backdrop-blur-xl hover:border-teal-500/60 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/30 to-teal-500/10 border border-teal-500/50 text-teal-300 flex items-center justify-center mb-7 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-5">Our Mission</h3>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 font-light">
                To give every student a direct, transparent channel to raise concerns — whether about hostels, academics, faculty, or facilities — and ensure those concerns actually reach the people who can fix them.
              </p>
              <div className="h-1.5 w-16 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"></div>
            </div>
          </div>

          {/* Vision */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-900/20 border border-emerald-500/30 rounded-3xl p-10 sm:p-12 shadow-2xl backdrop-blur-xl hover:border-emerald-500/60 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-emerald-500/10 border border-emerald-500/50 text-emerald-300 flex items-center justify-center mb-7 group-hover:scale-110 transition-transform">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-5">Our Vision</h3>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 font-light">
                A campus culture where no complaint goes unheard, where accountability is the norm, and where students trust the system enough to speak up the moment something feels wrong.
              </p>
              <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="relative border-y border-slate-800/50 bg-gradient-to-b from-slate-900/20 to-slate-900/5 backdrop-blur-sm py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-50 mb-4 tracking-tight">
              Why Students Choose CampusVoice
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto font-light">
              Designed by students, for students. Everything you need to make your voice count.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-slate-900/40 border border-slate-800/60 rounded-2xl p-8 backdrop-blur-md hover:border-teal-500/40 transition-all">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/10 border border-teal-500/40 text-teal-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-2">{title}</h3>
                      <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">{description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-50 mb-4 tracking-tight">
              Our Core Values
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto font-light">
              Every decision we make is guided by these principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {values.map(({ icon: Icon, title, description, color }) => {
              const colorMap = {
                teal: { bg: 'from-teal-500/20 to-teal-500/5', border: 'teal-500/40', text: 'teal-400', gradient: 'from-teal-400 to-emerald-400' },
                sky: { bg: 'from-sky-500/20 to-sky-500/5', border: 'sky-500/40', text: 'sky-400', gradient: 'from-sky-400 to-cyan-400' },
                emerald: { bg: 'from-emerald-500/20 to-emerald-500/5', border: 'emerald-500/40', text: 'emerald-400', gradient: 'from-emerald-400 to-teal-400' },
              }
              const colors = colorMap[color]

              return (
                <div key={title} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl`} />
                  <div className={`relative bg-slate-900/40 border border-slate-800/60 rounded-3xl p-9 backdrop-blur-md hover:border-${color}-500/50 transition-all`}>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.bg} border border-${colors.border} text-${colors.text} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3">{title}</h3>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">{description}</p>
                    <div className={`h-1 w-8 bg-gradient-to-r ${colors.gradient} rounded-full mt-6`}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Who's Behind It */}
      <section className="relative border-y border-slate-800/50 bg-gradient-to-b from-slate-900/20 to-slate-900/5 backdrop-blur-sm py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-500/40 text-teal-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md">
              <Users className="w-4 h-4" />
              <span>The Team</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-50 mb-4 tracking-tight">
              Who's Behind CampusVoice
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto font-light">
              A collaborative effort bringing different expertise to serve students better.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {team.map(({ role, desc, icon: Icon }) => (
              <div key={role} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <div className="relative bg-slate-900/40 border border-slate-800/60 rounded-3xl p-9 text-center backdrop-blur-md hover:border-teal-500/40 transition-all">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-500/5 border border-teal-500/40 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3">{role}</h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-50 mb-4 tracking-tight">
              Our Journey
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto font-light">
              From idea to impact: How CampusVoice is transforming campus life.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-500 via-emerald-500 to-transparent hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {timeline.map((item, idx) => (
                <div key={item.year} className={`${idx % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'} relative group`}>
                  <div className="bg-gradient-to-br from-slate-900/50 to-slate-900/20 border border-slate-800/60 rounded-2xl p-8 backdrop-blur-md hover:border-teal-500/40 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      {idx % 2 === 0 ? (
                        <>
                          <div>
                            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">{item.year}</p>
                          </div>
                          <div className="hidden md:block w-5 h-5 rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 border-4 border-[#080C14] absolute right-0 transform translate-x-2.5 top-8 shadow-lg" />
                        </>
                      ) : (
                        <>
                          <div className="hidden md:block w-5 h-5 rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 border-4 border-[#080C14] absolute left-0 transform -translate-x-2.5 top-8 shadow-lg" />
                          <div>
                            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">{item.year}</p>
                          </div>
                        </>
                      )}
                    </div>
                    <p className="text-slate-200 font-bold text-lg sm:text-xl mb-2">{item.event}</p>
                    <p className="text-slate-400 text-sm sm:text-base font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative border-t border-slate-800/50 max-w-5xl mx-auto text-center px-4 sm:px-6 py-24 sm:py-32">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-emerald-500/20 to-teal-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-slate-900/60 border border-teal-500/30 rounded-3xl p-10 sm:p-16 shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="inline-block p-4 bg-gradient-to-br from-teal-500/30 to-emerald-500/20 border border-teal-500/50 rounded-2xl mb-8">
              <Heart className="w-10 h-10 text-teal-300" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-slate-50 mb-6 tracking-tight">
              Ready to Make Campus Better?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              Your voice is powerful. Don't let an issue go unheard. File your complaint anonymously and securely. Together, we're making real change.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <NavLink
                to="/complain"
                className="group/btn inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold px-10 py-4 sm:py-5 rounded-xl shadow-lg shadow-teal-500/40 hover:shadow-teal-500/60 active:scale-95 transition-all text-base sm:text-lg"
              >
                <span>File a Complaint</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </NavLink>
              <NavLink
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-slate-800/60 hover:bg-slate-700/80 text-slate-100 font-semibold px-10 py-4 sm:py-5 rounded-xl border border-slate-700/60 hover:border-slate-600 transition-all text-base sm:text-lg backdrop-blur-md"
              >
                <span>Have Questions?</span>
                <Sparkles className="w-5 h-5" />
              </NavLink>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-700/50">
              <p className="text-slate-500 text-sm font-light">
                ✓ 100% Anonymous  •  ✓ Secure Encryption  •  ✓ Fast Response  •  ✓ Real Impact
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs