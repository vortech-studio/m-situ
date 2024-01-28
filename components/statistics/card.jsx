export function Card({ data }) {
  console.log(data);
  return (
    <div className="grid overflow-hidden rounded-lg border-[0.5px] bg-white p-4 shadow sm:p-6">
      <div>
        <dl className="space-y-3">
          <dt className="flex gap-3">
            <div className={`h-3 w-3 rounded-full bg-[#2FCF31]`}></div>
            <span className="text-xs font-medium uppercase text-gray">
              {data.label}
            </span>
          </dt>
          <dd>
            <div className="font-bold tracking-wide text-darkGray sm:text-2xl">
              {data.value}
            </div>
          </dd>
        </dl>
      </div>
    </div>
  );
}
