// https://ics.media/tutorial-three/camera_orbitcontrols.html

window.addEventListener('load', init);

function init() {
    // サイズ指定
    const width = 960;
    const height = 540;

    // WebGLをレンダリングするためのレンダラーを生成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
    });
    renderer.setPixelRatio(window.devicePixcelRatio);
    // レンダラーのサイズを変更する
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    // カメラの初期座標を設定
    camera.position.set(0, 0, 1000);

    // カメラコントローラーを作成
    // ドラッグでカメラ位置を移動させたり、マウスホイールでズームしたりすることが出来る
    const controls = new THREE.OrbitControls(camera);

    // 滑らかにカメラコントローラーを制御する
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    // 形状とマテリアルからメッシュを作成
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(300, 300, 300),
        new THREE.MeshNormalMaterial()
    );
    // シーンに追加
    scene.add(mesh);

    // 初回実行
    tick();

    // 毎フレーム毎に実行されるループイベント
    function tick() {
        // レンダリング
        renderer.render(scene, camera);

        // カメラコントローラーを更新
        // enableDamping, dampingFactor等を使う場合はupdate()を実行する必要がある
        controls.update();

        // 引数の関数を毎フレーム実行する
        requestAnimationFrame(tick);
    }
}