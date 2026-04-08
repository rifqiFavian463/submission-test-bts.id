type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChange, placeholder = "Search title..." }: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full max-w-md rounded-xl bg-white px-3 py-2 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
    />
  );
}

