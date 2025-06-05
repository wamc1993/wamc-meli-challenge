import { Skeleton } from "@/components/ui/skeleton";

export default function FormSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			{[...Array(4)].map((_, i) => (
				<div key={i} className="w-full">
					<Skeleton className="h-[21px] w-1/3 mb-1" />
					<Skeleton className="h-[36px] w-full" />
				</div>
			))}
			<Skeleton className="h-[80px] w-[304px] rounded-md self-center" />
			<Skeleton className="h-[36px] w-[304px] rounded-md self-center" />
		</div>
	);
}
