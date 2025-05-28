document.addEventListener('DOMContentLoaded', function () {
    // Accordion functionality is handled by Bootstrap's JS,
    // ensure Bootstrap JS is loaded.

    // "View More" tags functionality
    const viewMoreButtons = document.querySelectorAll('.view-more-tags');

    viewMoreButtons.forEach(button => {
        button.addEventListener('click', function () {
            const hiddenTagsId = this.dataset.targetHidden;
            const hiddenTagsSpan = document.getElementById(hiddenTagsId);

            if (hiddenTagsSpan) {
                const isHidden = hiddenTagsSpan.style.display === 'none';
                hiddenTagsSpan.style.display = isHidden ? 'inline' : 'none'; // Or 'block' if tags should stack

                // Update button text
                const totalTagsText = this.textContent.match(/\(\d+\)/)[0]; // Extracts "(X)"
                if (isHidden) {
                    this.textContent = `View Less ${totalTagsText}`;
                } else {
                    this.textContent = `View All ${totalTagsText}`;
                }
            }
        });
    });
});
