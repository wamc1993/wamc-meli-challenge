"use client";

import { useState, useEffect, ComponentType } from "react";

type WithSkeletonProps = {
	forceHydrated?: boolean;
};

export function withSkeleton<P>(
	WrappedComponent: ComponentType<P>,
	SkeletonComponent: ComponentType
) {
	return function Wrapper(props: P & WithSkeletonProps) {
		const [hydrated, setHydrated] = useState(false);

		useEffect(() => {
			if (props.forceHydrated) {
				setHydrated(true);
				return;
			}

			const timeout = setTimeout(() => setHydrated(true), 100);
			return () => clearTimeout(timeout);
		}, [props.forceHydrated]);

		return hydrated ? (
			<WrappedComponent {...props} />
		) : (
			<SkeletonComponent />
		);
	};
}
