import { Button } from "@/components/Button";

type Props = {
  page: number;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function Pagination({ page, hasNext, onPrev, onNext }: Props) {
  return (
    <div className="flex items-center justify-between">
      <Button variant="secondary" disabled={page === 1} onClick={onPrev}>
        Previous
      </Button>
      <p className="text-sm text-slate-600">Page {page}</p>
      <Button variant="secondary" disabled={!hasNext} onClick={onNext}>
        Next
      </Button>
    </div>
  );
}

