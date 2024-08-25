const socket = io({ maxHttpBufferSize: 5 * 1e6 });
const video = document.getElementById("video");
const content = document.getElementById("content");
const image = document.getElementById("image");
const cameraSelect = document.getElementById("camera-select");
const foundedList = document.getElementById("founded-list");

const codeReader = new ZXing.BrowserMultiFormatReader();
const input = document.getElementById("input");
let founded = new Set();

async function initCamera() {
    // asking permissions for camera
    try {
        await navigator.mediaDevices.getUserMedia({ video: true })
    } catch (error) {
        console.log("camera permissions denied", error);
    }
    const videoInputDevices = await codeReader.listVideoInputDevices();
    videoInputDevices.forEach((device) => {
        const opt = document.createElement('option');
        opt.value = device.deviceId;
        opt.innerHTML = device.label;
        cameraSelect.appendChild(opt);
    })
}

function clearList() {
    founded = new Set();
    foundedList.innerHTML = "";
}

function add(res) {
    if (!founded.has(res.text)) {
        founded.add(res.text);
        const ls = document.createElement("li");
        ls.innerText = res.text;
        foundedList.appendChild(ls);
    }
}

function startCamera() {
    reset();
    let selectedDeviceId = cameraSelect.value
    if (!selectedDeviceId) return
    codeReader.decodeFromInputVideoDeviceContinuously(
        selectedDeviceId, video,
        (res, err) => {
            if (res) {
                add(res);
            }
        }
    )
}

function stopCamera() {
    codeReader.reset();
    reset();
}

function reset() {
    image.src = "";
    video.src = "";
}

input.onchange = async (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    if (file.type.includes("video")) {
        reset();
        video.src = url;
        codeReader.decodeFromVideoContinuously(video, null, (res, err) => {
            if (res) {
                add(res);
            }
        })
    } else if (file.type.includes("image")) {
        reset();
        image.src = url;
        const res = await codeReader.decodeFromImageUrl(url)
        if (res) {
            add(res);
        }

    }
}
window.onload = async () => {
    // console.log(codeReader);
    await initCamera();
}