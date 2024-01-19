<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { formSchema, type FormSchema } from '../schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	export let form: SuperValidated<FormSchema>;
</script>

<!-- bind <-> {form} 차이는 상위 컴포넌트에서 공유를 하는지 여부가 다름 -->
<Form.Root method="POST" {form} schema={formSchema} let:config class="w-2/3 space-y-6">
	<Form.Field {config} name="url">
		<Form.Item>
			<Form.Label>Image URL</Form.Label>
			<Form.Input type="string" disabled={true} bind:value={form.data.url} />
			<img src={form.data.url} alt="" />
			<Form.Description>{form.data.url ? 'Uploaded image' : 'No image'}</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<!-- TODO Form.Root 처음 bind 되느 {form} 업데이트 하는 방법 찾으면 아래 hidden url input tag 삭제 -->
	<input type="text" id="url" name="url" class="hidden" bind:value={form.data.url} />
	<Form.Field {config} name="price">
		<Form.Item>
			<Form.Label>Price</Form.Label>
			<Form.Input type="number" />
			<Form.Description>This is item price.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="itemId">
		<Form.Item>
			<Form.Label>Item ID</Form.Label>
			<Form.Input type="text" />
			<Form.Description>This is item id.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button>Create</Form.Button>
</Form.Root>
