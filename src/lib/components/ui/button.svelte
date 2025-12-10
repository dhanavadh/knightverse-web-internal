<script lang="ts" module>
	import { cva, type VariantProps } from 'class-variance-authority';

	export const buttonVariants = cva(
		'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
		{
			variants: {
				variant: {
					default: 'bg-primary text-primary-foreground hover:bg-primary/90',
					destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
					outline:
						'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
					secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
					ghost: 'hover:bg-accent hover:text-accent-foreground',
					link: 'text-primary underline-offset-4 hover:underline'
				},
				size: {
					default: 'h-10 px-4 py-2',
					sm: 'h-9 rounded-md px-3',
					lg: 'h-11 rounded-md px-8',
					icon: 'h-10 w-10'
				}
			},
			defaultVariants: {
				variant: 'default',
				size: 'default'
			}
		}
	);

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type BaseProps = {
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
		className?: string;
		children?: Snippet;
	};

	type ButtonProps = BaseProps &
		HTMLButtonAttributes & {
			href?: never;
		};

	type AnchorProps = BaseProps &
		HTMLAnchorAttributes & {
			href: string;
		};

	type Props = ButtonProps | AnchorProps;

	let {
		variant = 'default',
		size = 'default',
		class: classFromClass,
		className,
		href,
		children,
		...rest
	}: Props = $props();

	let mergedClass = $derived(cn(buttonVariants({ variant, size }), classFromClass, className));
</script>

{#if href}
	<a {href} class={mergedClass} {...rest as HTMLAnchorAttributes}>
		{@render children?.()}
	</a>
{:else}
	<button class={mergedClass} {...rest as HTMLButtonAttributes}>
		{@render children?.()}
	</button>
{/if}
