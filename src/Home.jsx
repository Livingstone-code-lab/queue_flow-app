import { ArrowRight, Users, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import adrienDelforge from "./assets/adrienDelforge.jpg";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen">

        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl animate-pulse" />
          <div className="absolute right-[-120px] top-20 h-[500px] w-[500px] rounded-full bg-violet-300/25 blur-3xl" />
          <div className="absolute bottom-[-150px] left-1/3 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl" />
        </div>

        {/* ================= NAVBAR ================= */}
        <nav className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">

          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
              <Users size={19} strokeWidth={2.5} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              Queue<span className="text-indigo-600">Flow</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-gray-500 md:flex">
            <a href="#how-it-works" className="transition hover:text-indigo-600">How it works</a>

            <a href="#access" className="transition hover:text-indigo-600">Get started</a>
          </div>

          <Link to="/stafflogin" className="hidden rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 sm:block">Staff Login</Link>
        </nav>

        {/* ================= HERO CONTENT ================= */}
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-7xl items-center gap-14 px-6 pb-16 pt-8 lg:grid-cols-2 lg:px-10 lg:pb-20">

          {/* LEFT */}
          <div className="max-w-2xl">

            {/* Small badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/80 px-3.5 py-2 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur-sm">
              <Sparkles size={14} />
              Smarter queues. Better experiences.
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">

              Skip the chaos.

              <span className="mt-2 block bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                Join the flow.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
              QueueFlow makes waiting simpler. Join a queue, track your
              position, and know when it’s your turn — without standing around.
            </p>

            {/* CTA */}
            <div id="access" className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/chooseview" className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-500/25 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30">Continue
                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-indigo-500" />
                Simple to use
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-indigo-500" />
                Real-time queue tracking
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-indigo-500" />
                Built for everyone
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">

            {/* Glow behind image */}
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-r from-indigo-500/30 via-violet-500/20 to-indigo-400/30 blur-3xl" />

            {/* Main image card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 p-2 shadow-2xl shadow-indigo-900/10 backdrop-blur-xl">

              <div className="relative overflow-hidden rounded-[1.5rem]">

                <img
                  src={adrienDelforge}
                  alt="People waiting in an organized queue"
                  className="h-[480px] w-full object-cover transition duration-700 hover:scale-105"
                />

                {/* Image gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 via-transparent to-transparent" />

                {/* Floating card */}
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/15 p-4 shadow-xl backdrop-blur-xl">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs font-medium text-white/70">
                        Current queue
                      </p>

                      <p className="mt-1 text-lg font-bold text-white">
                        Your turn is getting closer
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md">
                      <ArrowRight size={18} />
                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* Floating notification */}
            <div className="absolute -left-6 top-14 hidden rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-xl shadow-indigo-900/10 backdrop-blur-xl sm:block animate-bounce [animation-duration:4s]">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Users size={17} />
                </div>

                <div>
                  <p className="text-[10px] font-medium text-gray-400">
                    Queue status
                  </p>

                  <p className="text-sm font-bold text-gray-800">
                    You're moving up
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="relative border-t border-gray-100 bg-gray-50/70 px-6 py-24 lg:px-10"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              Simple by design
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              A better way to manage waiting
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
              Whether you're waiting for service or managing the queue,
              QueueFlow keeps everything organized.
            </p>

          </div>


          <div className="mt-14 grid gap-5 md:grid-cols-3">

            {/* Card 1 */}
            <div className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                <Users size={21} />
              </div>

              <h3 className="mt-6 text-lg font-bold text-gray-900">
                Join a queue
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Choose an institution and get your place in line without
                unnecessary waiting.
              </p>

            </div>


            {/* Card 2 */}
            <div className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-violet-100 hover:shadow-xl hover:shadow-violet-500/5">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
                <Sparkles size={21} />
              </div>

              <h3 className="mt-6 text-lg font-bold text-gray-900">
                Track your position
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Keep an eye on your position and know when your turn is
                approaching.
              </p>

            </div>


            {/* Card 3 */}
            <div className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                <ShieldCheck size={21} />
              </div>

              <h3 className="mt-6 text-lg font-bold text-gray-900">
                Get served
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Staff manage the queue while customers move through it
                smoothly and efficiently.
              </p>

            </div>

          </div>
        </div>
      </section>


      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-100 bg-white px-6 py-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Users size={14} />
            </div>

            <span className="text-sm font-bold">
              Queue<span className="text-indigo-600">Flow</span>
            </span>
          </div>

          <p className="text-xs text-gray-400">
            Making queues simpler, one ticket at a time.
          </p>

        </div>

      </footer>

    </main>
  );
}