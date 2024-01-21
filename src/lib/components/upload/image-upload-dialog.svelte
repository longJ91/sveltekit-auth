<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { type FormSchema } from '../../../routes/(protected)/item/schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	export let form: SuperValidated<FormSchema>;
	export let serviceType: string;
	let files: FileList;
	$: dialogOpen = false;
	
	async function saveClickEvent() {
		let jsonValue: Array<any> = [];

		for (let index = 0; index < files.length; index++) {
			const file: File = files[index];
			jsonValue.push({
				fileName: index.toString(),
				fileExtension: file.type.split('/')[1],
				mediaType: file.type,
				serviceType: serviceType
			});
		}
		const res: Response = await fetch('/api/generate/upload-signed-urls', {
			method: 'POST',
			body: JSON.stringify(jsonValue),
			headers: {
				'content-type': 'application/json'
			}
		});
		const signedUrls: Array<any> = await res.json();
		const { fileUrl, uploadSignedUrl } = signedUrls[0];
		const response = await upload(uploadSignedUrl, files[0]);
		form.data.url = fileUrl;
		closeAndToast();
	}

	async function upload(uploadSignedUrl: string, file: File) {
		const blob = new Blob([file], { type: file.type });
		let obj = new FormData();
		obj.append('signedUrl', uploadSignedUrl);
		obj.append('file', blob);
		try {
			const response = await fetch('/api/upload-file', {
				method: 'POST',
				body: obj
			});
			return await response.arrayBuffer();
		} catch (error) {
			console.error('Error:', error);
		}
	}

	function closeAndToast() {
		dialogOpen = false;
		toast.success('Success', {
			description: 'Completed to upload image',
			action: {
				label: 'X',
				onClick: () => console.log('X')
			}
		});
	}
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Upload Image File</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Upload Image File</Dialog.Title>
			<Dialog.Description>
				Make changes to item image here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid w-full max-w-sm items-center gap-1.5">
			<Label for="file">Image File</Label>
			<input
				class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				accept="image/png, image/jpeg"
				bind:files
				id="avatar"
				name="avatar"
				type="file"
			/>
		</div>
		<Dialog.Footer>
			<Button type="submit" on:click={saveClickEvent} disabled={!files}>Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
