let animationId = null;
let canvas, ctx;
let object1, object2;
let collisionCount = 0;

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    setTimeout(() => {
        errorDiv.classList.add('hidden');
    }, 4000);
}

function validate() {
    const v1 = parseFloat(document.getElementById('v1').value);
    const v2 = parseFloat(document.getElementById('v2').value);
    const m1 = parseFloat(document.getElementById('m1').value);
    const m2 = parseFloat(document.getElementById('m2').value);

    if (isNaN(v1) || isNaN(v2) || isNaN(m1) || isNaN(m2)) {
        showError('Please fill in all fields with valid numbers!');
        return null;
    }

    if (m1 <= 0 || m2 <= 0) {
        showError('Masses must be positive values!');
        return null;
    }

    return { v1, v2, m1, m2 };
}

function calculateCollision(v1, v2, m1, m2) {
    const v1f = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
    const v2f = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);

    return { v1f, v2f };
}

function simulate() {
    const input = validate();
    if (!input) return;

    const { v1, v2, m1, m2 } = input;
    const { v1f, v2f } = calculateCollision(v1, v2, m1, m2);

    const pInitial = m1 * v1 + m2 * v2;
    const pFinal = m1 * v1f + m2 * v2f;
    const eInitial = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
    const eFinal = 0.5 * m1 * v1f * v1f + 0.5 * m2 * v2f * v2f;

    document.getElementById('v1Initial').textContent = v1.toFixed(2);
    document.getElementById('v1Final').textContent = v1f.toFixed(2);
    document.getElementById('v2Initial').textContent = v2.toFixed(2);
    document.getElementById('v2Final').textContent = v2f.toFixed(2);
    document.getElementById('pInitial').textContent = pInitial.toFixed(2);
    document.getElementById('pFinal').textContent = pFinal.toFixed(2);
    document.getElementById('eInitial').textContent = eInitial.toFixed(2);
    document.getElementById('eFinal').textContent = eFinal.toFixed(2);

    document.getElementById('simulationArea').classList.remove('hidden');
    document.getElementById('simulationArea').classList.add('flex');
    document.getElementById('resultsArea').classList.remove('hidden');
    document.getElementById('resultsArea').classList.add('flex');

    collisionCount = 0;
    document.getElementById('collisionCount').textContent = '0';

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const size1 = Math.max(20, Math.min(50, m1 * 8));
    const size2 = Math.max(20, Math.min(50, m2 * 8));

    object1 = {
        x: canvas.width * 0.25,
        y: canvas.height / 2,
        size: size1,
        velocity: v1 * 10,
        initialVelocity: v1 * 10,
        mass: m1,
        color: '#17A2B8',
        finalVelocity: v1f * 10
    };

    object2 = {
        x: canvas.width * 0.75,
        y: canvas.height / 2,
        size: size2,
        velocity: v2 * 10,
        initialVelocity: v2 * 10,
        mass: m2,
        color: '#FD7E14',
        finalVelocity: v2f * 10
    };

    if (animationId) cancelAnimationFrame(animationId);
    animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    const distance = Math.abs(object1.x - object2.x);

    const relativeVelocity = object1.x < object2.x
        ? object1.velocity - object2.velocity
        : object2.velocity - object1.velocity;

    const isApproaching = relativeVelocity > 0;

    if (distance <= (object1.size + object2.size) / 2 && isApproaching) {
        collisionCount++;
        document.getElementById('collisionCount').textContent = collisionCount;

        const currentV1 = object1.velocity / 10;
        const currentV2 = object2.velocity / 10;
        const result = calculateCollision(currentV1, currentV2, object1.mass, object2.mass);

        object1.velocity = result.v1f * 10;
        object2.velocity = result.v2f * 10;

        const overlap = (object1.size + object2.size) / 2 - distance;
        if (overlap > 0) {
            if (object1.x < object2.x) {
                object1.x -= overlap / 2 + 1;
                object2.x += overlap / 2 + 1;
            } else {
                object1.x += overlap / 2 + 1;
                object2.x -= overlap / 2 + 1;
            }
        }
    }

    object1.x += object1.velocity * 0.016;
    object2.x += object2.velocity * 0.016;

    if (object1.x - object1.size / 2 < 0) {
        object1.x = object1.size / 2;
        object1.velocity = -object1.velocity * 0.95;
    }
    if (object1.x + object1.size / 2 > canvas.width) {
        object1.x = canvas.width - object1.size / 2;
        object1.velocity = -object1.velocity * 0.95;
    }

    if (object2.x - object2.size / 2 < 0) {
        object2.x = object2.size / 2;
        object2.velocity = -object2.velocity * 0.95;
    }
    if (object2.x + object2.size / 2 > canvas.width) {
        object2.x = canvas.width - object2.size / 2;
        object2.velocity = -object2.velocity * 0.95;
    }

    drawObject(object1);
    drawObject(object2);

    const currentV1Display = (object1.velocity / 10).toFixed(2);
    const currentV2Display = (object2.velocity / 10).toFixed(2);
    document.getElementById('currentV1').textContent = currentV1Display + ' m/s';
    document.getElementById('currentV2').textContent = currentV2Display + ' m/s';

    animationId = requestAnimationFrame(animate);
}

function drawObject(obj) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 5;

    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x - obj.size / 2, obj.y - obj.size / 2, obj.size, obj.size);

    ctx.shadowColor = 'transparent';

    const arrowLength = 30;
    const arrowStartX = obj.x + (obj.velocity > 0 ? obj.size / 2 + 10 : -obj.size / 2 - 10);
    const arrowEndX = arrowStartX + (obj.velocity > 0 ? arrowLength : -arrowLength);

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(arrowStartX, obj.y);
    ctx.lineTo(arrowEndX, obj.y);
    ctx.stroke();

    const headlen = 8;
    const angle = obj.velocity > 0 ? 0 : Math.PI;
    ctx.beginPath();
    ctx.moveTo(arrowEndX, obj.y);
    ctx.lineTo(arrowEndX - headlen * Math.cos(angle - Math.PI / 6),
               obj.y - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(arrowEndX - headlen * Math.cos(angle + Math.PI / 6),
               obj.y - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fillStyle = '#333';
    ctx.fill();
}

function reset() {
    document.getElementById('v1').value = '';
    document.getElementById('v2').value = '';
    document.getElementById('m1').value = '';
    document.getElementById('m2').value = '';

    document.getElementById('simulationArea').classList.add('hidden');
    document.getElementById('simulationArea').classList.remove('flex');
    document.getElementById('resultsArea').classList.add('hidden');
    document.getElementById('resultsArea').classList.remove('flex');

    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}
