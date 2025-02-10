
document.addEventListener("DOMContentLoaded", function () {
    const rig = document.querySelector("#cameraRig");
    const camera = document.querySelector("#camera");
    let targetPosition = rig.getAttribute("position");

    function move(dir) {
        let rotation = camera.getAttribute("rotation").y;
        let angle = (rotation + dir) * (Math.PI / 180);

        let dx = Math.sin(angle) * 0.5;
        let dz = Math.cos(angle) * 0.5;

        let pos = rig.getAttribute("position");
        targetPosition = { x: pos.x + dx, y: pos.y, z: pos.z + dz };

        animateMove();
    }

    function animateMove() {
        let startPos = rig.getAttribute("position");
        let progress = 0;

        function step() {
            progress += 0.05;
            if (progress > 1) progress = 1;

            let newX = startPos.x + (targetPosition.x - startPos.x) * progress;
            let newY = startPos.y;
            let newZ = startPos.z + (targetPosition.z - startPos.z) * progress;

            rig.setAttribute("position", { x: newX, y: newY, z: newZ });

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    // Touch Controls (Joystick)
    document.getElementById("up-btn").addEventListener("touchstart", () => move(180));
    document.getElementById("down-btn").addEventListener("touchstart", () => move(0));
    document.getElementById("left-btn").addEventListener("touchstart", () => move(-90));
    document.getElementById("right-btn").addEventListener("touchstart", () => move(90));

    // Touch Controls (Joystick)
    document.getElementById("up-btn").addEventListener("click", () => move(180));
    document.getElementById("down-btn").addEventListener("click", () => move(0));
    document.getElementById("left-btn").addEventListener("click", () => move(-90));
    document.getElementById("right-btn").addEventListener("click", () => move(90));

    // Keyboard Controls (WASD)
    document.addEventListener("keydown", function (event) {
        if (event.key === "w" || event.key === "W") move(180);
        if (event.key === "s" || event.key === "S") move(0);
        if (event.key === "a" || event.key === "A") move(-90);
        if (event.key === "d" || event.key === "D") move(90);
    });
});