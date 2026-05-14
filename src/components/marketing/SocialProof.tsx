export default function SocialProof() {
  const stats = [
    {
      value: "+18%",
      label: "Average margin improvement",
    },
    {
      value: "3× Faster",
      label: "Payment collection cycles",
    },
    {
      value: "90% Less",
      label: "Client status check-ins",
    },
  ];

  return (
    <section
      className="
        relative
        border-y
        border-white/5
        bg-[#0B0B0C]
        py-24
      "
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* TOP LABEL */}
        <div className="mb-16 text-center">
          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-[0.24em]
              text-white/40
            "
          >
            Trusted by premium residential construction firms
          </p>
        </div>

        {/* STATS */}
        <div
          className="
            grid
            gap-px
            overflow-hidden
            rounded-3xl
            border
            border-white/5
            bg-white/5
            sm:grid-cols-3
          "
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="
                bg-[#101113]
                px-8
                py-10
              "
            >
              <div
                className="
                  text-4xl
                  font-semibold
                  tracking-[-0.06em]
                  text-white
                "
              >
                {stat.value}
              </div>

              <p
                className="
                  mt-3
                  max-w-[14rem]
                  text-sm
                  leading-relaxed
                  text-white/50
                "
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* TESTIMONIAL */}
        <div className="mx-auto mt-20 max-w-4xl text-center">
          <blockquote
            className="
              text-2xl
              font-medium
              leading-[1.5]
              tracking-[-0.03em]
              text-white/88
              md:text-3xl
            "
          >
            “BUILDRAIL gave our clients a far more professional experience while
            eliminating constant follow-ups, approval confusion, and payment
            delays across active projects.”
          </blockquote>

          <div className="mt-8">
            <div className="text-sm font-medium text-white">
              Michael Reynolds
            </div>

            <div className="mt-1 text-sm text-white/45">
              Owner · Reynolds Design Build
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
