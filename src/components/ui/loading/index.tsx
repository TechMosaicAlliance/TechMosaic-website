type IProps = {
  length?: number;
};

export function BlogLoader({ length = 4 }: { length?: number }) {
  return (
    <div className="grid max-w-3xl mt-[4rem] gap-8 mx-auto rounded-md ">
      <div className="w-full space-y-3">
        <div className="grid w-full gap-4">
          {Array.from({ length: length }).map((item, idx) => (
            <div
              key={idx}
              className="w-full p-8 mx-auto rounded-xl border-zinc-200 "
            >
              <div className="flex space-x-4 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-zinc-200"></div>
                <div className="flex-1 py-1 space-y-6">
                  <div className="h-2 rounded bg-zinc-200"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 col-span-2 rounded bg-zinc-200"></div>
                      <div className="h-2 col-span-1 rounded bg-zinc-200"></div>
                    </div>
                    <div className="h-2 rounded bg-zinc-200"></div>
                    <div className="h-2 rounded bg-zinc-200"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CardLoader({ length = 6 }: IProps) {
  return (
    <section className=" grid gap-2 pt-[2rem] grid-cols-layoutLg ">
      {Array.from({ length }).map((item, idx) => (
        <div
          key={idx}
          className="border border-gray-200/80 rounded-md p-7 h-[14rem] max-w-sm w-full mx-auto"
        >
          <div className="animate-pulse flex flex-col gap-3">
            <div className="rounded-xl bg-gray-200 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-gray-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                  <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
