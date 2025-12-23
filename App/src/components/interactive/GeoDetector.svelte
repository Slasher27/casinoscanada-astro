<script lang="ts">
    import { onMount } from 'svelte';
    import { userLocation, isLocationLoading } from '../../stores/user';

    onMount(async () => {
        // Check if we already have location in session/local storage to save API calls
        const cached = sessionStorage.getItem('user_location');
        if (cached) {
            userLocation.set(JSON.parse(cached));
            return;
        }

        isLocationLoading.set(true);
        try {
            // Using a free IP-API (Note: In production, consider a backend proxy or paid service)
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();

            if (data.error) {
                console.warn('Geo-detection failed:', data.reason);
                return;
            }

            const location = {
                country: data.country_name,
                region: data.region,
                city: data.city,
                currency: data.currency
            };

            userLocation.set(location);
            sessionStorage.setItem('user_location', JSON.stringify(location));

            // Optional: Log for analytics
            console.log(`User detected in: ${location.city}, ${location.region}`);
        } catch (e) {
            console.warn('Geo-detection unavailable:', e);
        } finally {
            isLocationLoading.set(false);
        }
    });
</script>

<!-- Renderless component, just logic -->
<div class="hidden" aria-hidden="true"></div>
