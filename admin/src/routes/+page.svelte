<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let lon: string;
	let lat: string;

	interface Weather {
		lat: string;
		lon: string;
		elevation: number;
		timezone: string;
		units: string;
		current: {
			icon: string;
			icon_num: number;
			summary: string;
			temperature: number;
			feels_like: number;
			wind_chill: number;
			dew_point: number;
			wind: { speed: number; gusts: number; angle: number; dir: string };
			precipitation: { total: number; type: string };
			cloud_cover: number;
			ozone: number;
			pressure: number;
			uv_index: number;
			humidity: number;
			visibility: number;
		};
	}

	let weather: Weather = {
		lat: '',
		lon: '',
		elevation: 0,
		timezone: '',
		units: '',
		current: {
			icon: '',
			icon_num: 16,
			summary: '',
			temperature: 0,
			feels_like: 0,
			wind_chill: 0,
			dew_point: 0,
			wind: { speed: 0, gusts: 0, angle: 0, dir: '' },
			precipitation: { total: 0, type: '' },
			cloud_cover: 0,
			ozone: 0,
			pressure: 0,
			uv_index: 0,
			humidity: 0,
			visibility: 0
		}
	};
	// get geo location
	const geo = () => {
		if (browser)
			navigator.geolocation.getCurrentPosition((position) => {
				console.log('Latitude: ', position.coords.latitude);
				console.log('Longitude: ', position.coords.longitude);

				lon = position.coords.longitude.toString();
				lat = position.coords.latitude.toString();
			});
	};

	const getWeather = async () => {
		const url = `https://ai-weather-by-meteosource.p.rapidapi.com/current?lat=${lat}&lon=${lon}&timezone=auto&language=en&units=auto`;
		console.log(url);
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '9e333c0431mshd8d87c23fe0cd6ep1d43f8jsn94680954db83',
				'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
			}
		};

		try {
			const response = await fetch(url, options);
			const result = await response.text();
			weather = JSON.parse(result);
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	};

	onMount(() => {
		geo();
	});

	// fetch location every 5 seconds
	setInterval(() => {
		geo();
	}, 5000);

	// run after 5 seconds
	setTimeout(() => {
		// if (lat && lon) getWeather();
	}, 5000);
</script>

<body class="min-h-screen bg-gray-100">
	<div class="p-5 md:p-10">
		<h1 class="mb-5 text-3xl font-bold">Dashboard</h1>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			<!-- Weather Widget -->

			<div
				class="relative flex w-full flex-col items-center overflow-hidden rounded-md bg-blue-400 p-6"
				id="widget"
			>
				<div
					class="absolute -bottom-20 z-10 h-96 rounded-full bg-blue-500"
					style="width: 430px"
				></div>
				<div class="z-10 w-full">
					<div class="flex w-full justify-between text-sm text-blue-50">
						<div>Day</div>
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 transform cursor-pointer duration-200 hover:scale-110"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
								></path>
							</svg>
						</div>
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 transform cursor-pointer duration-200 hover:scale-110"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
								></path>
							</svg>
						</div>
					</div>
					<div class="flex w-full justify-center">
						<img
							src={`https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_${weather.current.icon_num}-512.png`}
							class="tranform my-6 w-32 duration-200 hover:scale-105"
						/>
					</div>
					<div class="flex w-full flex-col items-center">
						<h2 class="text-7xl font-extrabold text-white">
							{weather.current.temperature}<sup class="text-5xl font-medium">o</sup>
						</h2>
						<p class="text-white">Feels Like {weather.current.feels_like}o</p>
					</div>
					<div class="mt-10 flex w-full justify-between text-sm text-blue-50">
						<div class="flex flex-col items-center justify-center space-y-1">
							<p class="text-xs">Wind Now</p>
							<p><span class="text-xl font-bold">{weather.current.wind.speed}</span>km</p>
						</div>
						<div class="flex flex-col items-center justify-center space-y-1">
							<p class="text-xs">Huminity</p>
							<p><span class="text-xl font-bold">{weather.current.humidity}</span>%</p>
						</div>
						<div class="flex flex-col items-center justify-center space-y-1">
							<p class="text-xs">Precipitation</p>
							<p><span class="text-xl font-bold">{weather.current.precipitation.total}</span>%</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Next Event Widget -->
			<div class="relative w-full rounded-md sm:mx-auto sm:max-w-xl" id="widget">
				<img
					src="https://images.unsplash.com/photo-1608788524926-41b5181b89a2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=3150&amp;q=80"
					class="h-full w-full rounded-md object-cover"
				/>
				<div
					class="glassmorphism-25 absolute right-3 top-6 rounded-full p-1 px-3 text-sm font-bold text-gray-50"
				>
					James Bond Island
				</div>
				<div
					class="glassmorphism-25 absolute bottom-0 left-0 right-0 flex flex h-16 items-center justify-between space-y-2 rounded-b-3xl p-3 px-5 opacity-95"
				>
					<div class="flex items-center space-x-3 font-medium text-white">
						<img
							src="https://images.unsplash.com/profile-1580909319031-f23261ca6127image?dpr=2&amp;auto=format&amp;fit=crop&amp;w=20&amp;h=20&amp;q=60&amp;crop=faces&amp;bg=fff"
							class="scale-100 transform rounded-full ring-2 ring-white ring-offset-white hover:scale-105"
						/>
						<div>
							<div>Engin Akyurt</div>
							<div class="flex items-center text-sm">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="-ml-1 mr-1"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<circle cx="12" cy="11" r="3"></circle>
									<path
										d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"
									></path>
								</svg>
								Thailand
							</div>
						</div>
					</div>
					<div class="flex items-center space-x-2 text-gray-50">
						<button class="cursor-pointer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="scale-100 transform hover:scale-110"
								width="32"
								height="32"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"></path>
								<line x1="12" y1="12" x2="12" y2="12.01"></line>
								<line x1="8" y1="12" x2="8" y2="12.01"></line>
								<line x1="16" y1="12" x2="16" y2="12.01"></line>
							</svg>
						</button>
						<button class="cursor-pointer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="scale-100 transform hover:scale-110"
								width="32"
								height="32"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path
									d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
								></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<!-- Your Location Widget -->
			<div class="card rounded-lg bg-white p-5 shadow">
				<!-- <Map {lat} lng={lon} /> -->
			</div>
			<!-- Drivers Widget -->
			<div class="card rounded-lg bg-white p-5 shadow">
				<h2 class="font-bold">Drivers</h2>
				<!-- Drivers content goes here -->
				<!-- List of Drivers Name, Vehicle Type and Contact Button -->
				<div class="flex flex-col space-y-2">
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-2">
							<img
								src="https://images.unsplash.com/profile-1580909319031-f23261ca6127image?dpr=2&amp;auto=format&amp;fit=crop&amp;w=20&amp;h=20&amp;q=60&amp;crop=faces&amp;bg=fff"
								class="h-8 w-8 rounded-full"
							/>
							<div>
								<div class="font-bold">Engin Akyurt</div>
								<div class="text-sm">Car</div>
							</div>
						</div>
						<button class="rounded-md bg-blue-500 px-3 py-1 text-white">Contact</button>
					</div>
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-2">
							<img
								src="https://images.unsplash.com/profile-1580909319031-f23261ca6127image?dpr=2&amp;auto=format&amp;fit=crop&amp;w=20&amp;h=20&amp;q=60&amp;crop=faces&amp;bg=fff"
								class="h-8 w-8 rounded-full"
							/>
							<div>
								<div class="font-bold">Engin Akyurt</div>
								<div class="text-sm">Car</div>
							</div>
						</div>
						<button class="rounded-md bg-blue-500 px-3 py-1 text-white">Contact</button>
					</div>
				</div>
			</div>
			<!-- Translator Widget -->
			<div class="card rounded-lg bg-white p-5 shadow">
				<h2 class="font-bold">Translator</h2>
				<!-- Translator content goes here -->
				<p class="my-4">Translated Text...</p>
				<div class="flex items-center space-x-2">
					<input
						type="text"
						class="w-full rounded-md border border-gray-300 p-2"
						placeholder="Enter text to translate"
					/>
					<button class="rounded-md bg-blue-500 px-3 py-1 text-white">Translate</button>
				</div>
			</div>
			<!-- Attractions Widget -->
			<div class="card rounded-lg bg-white p-5 shadow">
				<h2 class="font-bold">Attractions</h2>
				<!-- Attractions content goes here -->
				<!-- List of Attractions Name, Location, distance and Directions Button -->
				<div class="flex flex-col space-y-2">
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-2">
							<img
								src="https://images.unsplash.com/photo-1608788524926-41b5181b89a2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=3150&amp;q=80"
								class="h-8 w-8 rounded-md"
							/>
							<div>
								<div class="font-bold">James Bond Island</div>
								<div class="text-sm">Thailand - 20KM</div>
							</div>
						</div>
						<button class="rounded-md bg-blue-500 px-3 py-1 text-white">Directions</button>
					</div>
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-2">
							<img
								src="https://images.unsplash.com/photo-1608788524926-41b5181b89a2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=3150&amp;q=80"
								class="h-8 w-8 rounded-md"
							/>
							<div>
								<div class="font-bold">James Bond Island</div>
								<div class="text-sm">Thailand - 30KM</div>
							</div>
						</div>
						<button class="rounded-md bg-blue-500 px-3 py-1 text-white">Directions</button>
					</div>
				</div>
			</div>
			<!-- Hotel Booking Widget -->
			<div class="card rounded-lg bg-white p-5 shadow">
				<h2 class="font-bold">Hotel Booking</h2>
				<!-- Hotel Booking content goes here -->
				<!-- List of Hotels Name, Location, Price and Book Button -->
				<div class="flex flex-col space-y-2">
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-2">
							<img
								src="https://images.unsplash.com/photo-1608788524926-41b5181b89a2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=3150&amp;q=80"
								class="h-8 w-8 rounded-md"
							/>
							<div>
								<div class="font-bold">James Bond Island</div>
								<div class="text-sm">Thailand - $200</div>
							</div>
						</div>
						<button class="rounded-md bg-blue-500 px-3 py-1 text-white">Book</button>
					</div>
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-2">
							<img
								src="https://images.unsplash.com/photo-1608788524926-41b5181b89a2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=3150&amp;q=80"
								class="h-8 w-8 rounded-md"
							/>
							<div>
								<div class="font-bold">James Bond Island</div>
								<div class="text-sm">Thailand - $300</div>
							</div>
						</div>
						<button class="rounded-md bg-blue-500 px-3 py-1 text-white">Book</button>
					</div>
				</div>
			</div>
			<!-- Currency Converter Widget -->
			<div class="card flex flex-col justify-between rounded-lg bg-white p-5 shadow">
				<h2 class="font-bold">Currency Converter</h2>
				<!-- Currency Converter content goes here -->
				<!-- Select Currency, Enter Value, Converted Value -->
				<div class="flex items-center space-x-2 py-4">
					<select class="rounded-md border border-gray-300 p-2" placeholder="Select Currency">
						<option>USD</option>
						<option>EUR</option>
						<option>GBP</option>
					</select>
					<input
						type="text"
						class="w-full rounded-md border border-gray-300 p-2"
						placeholder="Enter Value"
					/>
					<input
						type="text"
						class="w-full rounded-md border border-gray-300 p-2"
						placeholder="Converted Value"
					/>
				</div>
				<span />
			</div>
			<!-- Expense Tracker Widget -->
			<div class="card flex-col gap-4 rounded-lg bg-white p-5 shadow">
				<h2 class="font-bold">Expense Tracker</h2>
				<!-- Expense Tracker content goes here -->
				<div class="flex flex-row justify-between gap-4">
					<p class="text-3xl">Rs.0</p>
					<div class="flex flex-col gap-4">
						<input
							type="text"
							class="w-full rounded-md border border-gray-300 p-2"
							placeholder="Enter Expense"
						/>
						<button class="rounded-md bg-blue-500 px-3 py-1 text-white">Add</button>
					</div>
				</div>
			</div>
			<!-- Emergency Assistance Widget -->
			<div class="card rounded-lg bg-white p-5 shadow">
				<h2 class="font-bold">Emergency Assistance</h2>
				<!-- Emergency Assistance content goes here -->
				<!-- List of Emergency Contacts -->
				<div class="flex flex-col space-y-2">
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-2">
							<img
								src="https://images.unsplash.com/photo-1608788524926-41b5181b89a2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=3150&amp;q=80"
								class="h-8 w-8 rounded-md"
							/>
							<div>
								<div class="font-bold">James Bond Island</div>
								<div class="text-sm">Thailand - 20KM</div>
							</div>
						</div>
						<button class="rounded-md bg-blue-500 px-3 py-1 text-white">Call</button>
					</div>
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-2">
							<img
								src="https://images.unsplash.com/photo-1608788524926-41b5181b89a2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=3150&amp;q=80"
								class="h-8 w-8 rounded-md"
							/>
							<div>
								<div class="font-bold">James Bond Island</div>
								<div class="text-sm">Thailand - 30KM</div>
							</div>
						</div>
						<button class="rounded-md bg-blue-500 px-3 py-1 text-white">Call</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
