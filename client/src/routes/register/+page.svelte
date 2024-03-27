<script>
	import toast, { Toaster } from 'svelte-french-toast';
	import { createUser, signIn } from '$lib/firebase';

	let name = '';
	let email = '';
	let password = '';
	let cpassword = '';

	const handleSubmit = async () => {
		if (password !== cpassword) {
			toast.error('Passwords do not match');
			return;
		}

		if (name === '' || email === '' || password === '' || cpassword === '') {
			toast.error('Please fill in all fields');
			return;
		}

		try {
			await createUser(email, password, name);
			toast.success('Account created successfully');
			await signIn(email, password);
			window.location.href = '/';
		} catch (error) {
			// @ts-ignore
			toast.error(error.message);
		}
	};
</script>

<Toaster />
<div class="min-h-screen bg-gray-100">
	<div class="flex min-h-screen items-center justify-center">
		<div class="w-full max-w-md">
			<h1 class="mb-6 text-center text-3xl font-bold text-orange-500">Sign Up</h1>
			<form class="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
				<div class="mb-4">
					<label class="mb-2 block text-sm font-bold text-gray-700" for="email"> Full Name </label>
					<input
						class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
						id="name"
						type="name"
						placeholder="Full Name"
						bind:value={name}
					/>
				</div>
				<div class="mb-4">
					<label class="mb-2 block text-sm font-bold text-gray-700" for="email"> Email </label>
					<input
						class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
						id="email"
						type="email"
						placeholder="Email"
						bind:value={email}
					/>
				</div>
				<div class="mb-4">
					<label class="mb-2 block text-sm font-bold text-gray-700" for="password">
						Password
					</label>
					<input
						class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
						id="password"
						type="password"
						placeholder="Password"
						bind:value={password}
					/>
				</div>
				<div class="mb-6">
					<label class="mb-2 block text-sm font-bold text-gray-700" for="confirm-password">
						Confirm Password
					</label>
					<input
						class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
						id="confirm-password"
						type="password"
						placeholder="Confirm Password"
						bind:value={cpassword}
					/>
				</div>
				<div class="mb-6 flex items-center justify-between">
					<button
						class="focus:shadow-outline rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600 focus:outline-none"
						on:click={handleSubmit}
					>
						Sign Up
					</button>
				</div>
				<p class="text-center text-xs text-gray-600">
					By signing up, you agree to our Terms and Conditions.
				</p>
				<div class="mt-4 text-center">
					<a class="text-sm font-bold text-orange-500 hover:text-orange-800" href="/login">
						Already have an account? Log in!
					</a>
				</div>
			</form>
		</div>
	</div>
</div>
