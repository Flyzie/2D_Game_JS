function readMapFromFile(fileInput) {
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            const rows = content.split('\n');
            const newArray = [];

            for (let i = 0; i < rows.length; i++) {
                newArray.push(rows[i].trim().split(''));
            }

            // Update the map array
            map.length = 0;
            map.push(...newArray);
        };

        reader.readAsText(file);
    } else {
        console.error('No file selected');
    }
}