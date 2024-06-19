// Function to fetch data and populate HTML
async function populateFromSupabase() {
    // Initialize Supabase client
    var supabaseUrl = 'https://ilmufbxfsvyhpaqwdyxg.supabase.co';
    var supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsbXVmYnhmc3Z5aHBhcXdkeXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyNTk3NzcsImV4cCI6MjAzMzgzNTc3N30.XsOwbpsLN4lH6OLGR1J4jdGK-n1kOZOJhXH01MwiyPo';
    var supabase = supabase.createClient(supabaseUrl, supabaseKey);

    try {
        // Replace 'apps' with your actual table name in Supabase
        var { data, error } = await supabase.from('apps').select('*');

        if (error) {
            throw error;
        }

        // Select the container where you want to populate the data
        var container = document.querySelector('.row-cols-1'); // Adjust the selector as per your needs

        // Iterate over fetched data and populate HTML dynamically
        data.forEach(item => {
            var card = document.createElement('div');
            card.classList.add('col', 'd-flex', 'flex-column', 'gap-2');

            // Dynamically set the icon (assuming 'icon' field is the URL of an image)
            var iconDiv = document.createElement('div');
            iconDiv.classList.add('feature-icon-small', 'd-inline-flex', 'align-items-center', 'justify-content-center', 'text-bg-primary', 'bg-gradient', 'fs-4', 'rounded-3');
            var iconImg = document.createElement('img');
            iconImg.src = item.icon; // 'icon' field from Supabase
            iconDiv.appendChild(iconImg);

            // Add iconDiv to card
            card.appendChild(iconDiv);

            // Add title (h4)
            var title = document.createElement('h4');
            title.classList.add('fw-semibold', 'mb-0', 'text-body-emphasis');
            title.textContent = item.name; // 'name' field from Supabase
            card.appendChild(title);

            // Add description (p)
            var description = document.createElement('p');
            description.classList.add('text-body-secondary');
            description.textContent = item.description; // 'description' field from Supabase
            card.appendChild(description);

            // Add link (a)
            var link = document.createElement('a');
            link.classList.add('btn', 'btn-primary', 'btn-lg');
            link.textContent = 'Primary button'; // You can customize this text or use 'link' field from Supabase
            link.href = item.link; // 'link' field from Supabase
            card.appendChild(link);

            // Append the card to the container
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data from Supabase:', error.message);
    }
}

// Call the function to populate data on page load
populateFromSupabase();
