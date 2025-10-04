<script lang="ts">
    import * as Card from "$lib/components/ui/card/index";
    import * as Tabs from '$lib/components/ui/tabs/index';
    import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
    import { Checkbox } from "$lib/components/ui/checkbox/index";
    import { Button, buttonVariants } from "$lib/components/ui/button/index";
    import { Label } from "$lib/components/ui/label/index";
    import { Input } from "$lib/components/ui/input/index";
    import { type ValueWrapper, type TabWrapper, type DataState, defaultDataState, convertMoneyType } from "$lib";

    // I put type definitions in $lib/index.ts to reduce clutter in this file
    
    let data: DataState = $state(defaultDataState);
    let open = $state(false);

    // Option to use this calculator to par a till - changes the display
    let parmode = $state(false);
    let par = $state(200);

    let sum = $derived.by(() => {
        let s = Object.values(data)
            .flatMap(e => e.map((f: ValueWrapper) => f.value ? convertMoneyType(f.id) * f.value : 0))
            .reduce((n, curr) => n + curr, 0);
        if (parmode) return s - (par || 0);
        return s;
    });

    const resetAll = () => {
        data = defaultDataState;
        open = false;
    }
</script>

<!--Snippet for individual forms-->
{#snippet formField(data: ValueWrapper)}
    <div class='flex flex-row gap-2 justify-between'>
        <Label for={data.id}>{data.id}</Label>
        <Input id={data.id} type='number' placeholder={data.id} bind:value={data.value} min={0} class='w-32'/>
    </div>
{/snippet}

<!--Snippet for internal card elements-->
{#snippet renderCard(tab: TabWrapper)}
    <Card.Root>
            <Card.Header>
                <Card.Title>
                    {tab.value}
                </Card.Title>
            </Card.Header>
            <Card.Content class='flex flex-col gap-2 p-0 md:p-1 lg:p-4'>
                {#each tab.data as data}
                    {@render formField(data)}
                {/each}
            </Card.Content>
        </Card.Root>
{/snippet}

<!--Snippet for the tab elements that will only be rendered on smaller screen sizes-->
{#snippet renderTab(tab: TabWrapper)}
    <Tabs.Content value={tab.value}>
        {@render renderCard(tab)}
    </Tabs.Content>
{/snippet}

<!--The alert dialog component-->
{#snippet alertDialog()}
    <AlertDialog.Root bind:open>
        <AlertDialog.Trigger class={buttonVariants({ variant: "destructive" })}>
            Reset
        </AlertDialog.Trigger>
        <AlertDialog.Content class='max-w-xs'>
            <AlertDialog.Header>
                <AlertDialog.Title>Reset total?</AlertDialog.Title>
            </AlertDialog.Header>
            <AlertDialog.Footer>
                <AlertDialog.Cancel>No</AlertDialog.Cancel>
                <AlertDialog.Action onclick={resetAll}>Yes</AlertDialog.Action>
            </AlertDialog.Footer>
        </AlertDialog.Content>
    </AlertDialog.Root>
{/snippet}

<!--PAGE CONTENT-->

<div class='flex justify-center w-dvw p-8'>
    <Card.Root class='min-w-sm'>
        <Card.Header class='my-auto'>
            <div class={['text-3xl font-semibold', {'text-red-500': parmode && sum < 0, 'text-green-500': parmode && sum >= 0}]}>
                ${Math.abs(sum).toFixed(2)}
                {#if parmode && sum < 0}
                    under
                {:else if parmode && sum >= 0}
                    over
                {/if}
            </div>
            <div class='py-2 my-auto flex flex-row gap-4'>
                <Checkbox id='parmode' bind:checked={parmode} class='my-auto'/>
                <Label for='parmode'>Par?</Label>
                {#if parmode}
                    <Input type='number' placeholder={'Enter par'} bind:value={par} min={0} class='w-32'/>
                {/if}
            </div>
            <Card.Action>
                {@render alertDialog()}
            </Card.Action>
        </Card.Header>
        <Card.Content class='flex flex-row justify-center'>
            <!--When viewport is small, use tab mode-->
            <Tabs.Root value={'Coins'} class='md:hidden'>
                <Tabs.List>
                    {#each Object.keys(data) as value}
                        <Tabs.Trigger {value}>{value}</Tabs.Trigger>
                    {/each}
                </Tabs.List>
                {#each Object.entries(data) as [key,value]}
                    {@render renderTab({value: key, data: value})}
                {/each}
            </Tabs.Root>
            <div class='hidden md:flex flex-row gap-2 lg:gap-4'>
                {#each Object.entries(data) as [key, value]}
                    {@render renderCard({value: key, data: value})}
                {/each}
            </div>
        </Card.Content>
    </Card.Root>
</div>

