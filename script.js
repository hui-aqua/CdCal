function calculateDragForce() {
    // Retrieve input values
    const theta = parseFloat(document.getElementById('theta').value);
    const velocity = parseFloat(document.getElementById('velocity').value);
    const meshL = parseFloat(document.getElementById('meshL').value);
    const meshd = parseFloat(document.getElementById('meshd').value);

    // Calculate sn, cd0, and r
    const sn = 2 * meshd / meshL;
    const cd0 = 0.04 + Math.cos(theta * (Math.PI / 180)) * (-0.04 + sn - 1.24 * Math.pow(sn, 2) + 13.7 * Math.pow(sn, 3));
    const r = 1 - 0.46 * cd0;

    // Display the results
    document.getElementById('sn').value = sn.toFixed(4);
    document.getElementById('netCd').value = cd0.toFixed(4);
    document.getElementById('netr').value = r.toFixed(4);
}
function calculateDragForce() {
    // Retrieve input values
    const theta = parseFloat(document.getElementById('theta').value);
    const velocity = parseFloat(document.getElementById('velocity').value);
    const meshL = parseFloat(document.getElementById('meshL').value);
    const meshd = parseFloat(document.getElementById('meshd').value);

    // Calculate sn, cd0, and r
    const sn = 2 * meshd / meshL;
    const cd0 = 0.04 + Math.cos(theta * (Math.PI / 180)) * (-0.04 + sn - 1.24 * Math.pow(sn, 2) + 13.7 * Math.pow(sn, 3));
    const r = 1 - 0.46 * cd0;

    // Display the results
    document.getElementById('sn').value = sn.toFixed(4);
    document.getElementById('netCd').value = cd0.toFixed(4);
    document.getElementById('netr').value = r.toFixed(4);
}

// Add event listeners to input fields to trigger calculation on Enter key
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            calculateDragForce();
        }
    });
});