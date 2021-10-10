function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill(255, 0, 0);
    stroke(0, 0, 255);
    if (score_right_wrist > 0.2) {
        circle(rightWristy, rightWristx, 20);
        if (rightWristy > 0 && rightWristy <= 100) {
            document.getElementById("speed").innerHTML = "Speed: 0.5x";
            song.rate(0.5);
        }
        if (rightWristy > 100 && rightWristy <= 200) {
            document.getElementById("speed").innerHTML = "Speed: 1x";
            song.rate(1);
        }
        if (rightWristy > 200 && rightWristy <= 300) {
            document.getElementById("speed").innerHTML = "Speed: 1.5x";
            song.rate(1.5);
        }
        if (rightWristy > 300 && rightWristy <= 400) {
            document.getElementById("speed").innerHTML = "Speed: 2x";
            song.rate(2);
        }
        if (rightWristy > 400 && rightWristy <= 500) {
            document.getElementById("speed").innerHTML = "Speed: 2.5x";
            song.rate(2.5);
        }
    }

    if (score_left_wrist > 0.2) {
        circle(leftWristx, leftWristy, 20);
        number_leftwristy = Number(leftWristy);
        remove_decimal_left_wrist_y = floor(number_leftwristy);
        volume = remove_decimal_left_wrist_y / 500;
        document.getElementById("volume_heading").innerHTML = "Volume: " + volume;
        song.setVolume(volume);
    }

}

song = "";
leftWristx = "";
leftWristy = "";
rightWristx = "";
rightWristy = "";
score_left_wrist = "";
score_right_wrist = "";

function preload() {
    song = loadSound('music.mp3');
}

function play_song() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause_song() {
    song.pause();
}

function stop_song() {
    song.stop();
}

function modelLoaded() {
    console.log("Model Loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("leftwrist X :" + leftWristx + " Leftwrist Y:" + leftWristy);
        console.log("rightwrist X :" + rightWristx + " rightwrist Y:" + rightWristy);

        score_left_wrist = results[0].pose.keypoints[9].score;
        console.log("The Score Is:" + score_left_wrist);

        score_right_wrist = results[0].pose.keypoints[10].score;
        console.log("The Score Is:" + score_right_wrist);
    }
}