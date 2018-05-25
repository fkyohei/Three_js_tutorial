// https://ics.media/tutorial-three/geometry_general.html

window.addEventListener('load', init);

function init() {
    // サイズ指定
    const width = 960;
    const height = 540;

    // WebGLをレンダリングするためのレンダラーを生成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setPixelRatio(window.devicePixcelRatio);
    // レンダラーのサイズを変更する
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 500, +1000);
    // lookAt：カメラの視野の中心座標を指定。座標を指定するときはVector3を使う
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // コンテナーを作成
    // コンテナー：3Dオブジェクトを纏めるための機能
    // シーンの中に箱を作るイメージ（HTML DOMでいうとdivとかに近い感じ・・・？）
    const container = new THREE.Object3D();
    scene.add(container);

    // マテリアルを作成
    // side: ジオメトリの描画する面の指定
    // FrontSide: 表面のみ, BackSide: 裏面のみ, DoubleSide: 両面
    const material = new THREE.MeshStandardMaterial({
        color: 0xFF0000,
        side: THREE.DoubleSide
    });

    // 平行光源を作成
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // 環境光を作成
    const ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);

    // ジオメトリを作成
    const geometryList = [
        new THREE.SphereGeometry(50), // 球体
        new THREE.BoxGeometry(100, 100, 100), // 直方体
        new THREE.PlaneGeometry(100, 100), // 平面
        new THREE.TetrahedronGeometry(100,0), // カプセル形状
        new THREE.ConeGeometry(100, 100, 32), // 三角錐
        new THREE.CylinderGeometry(50, 50, 100, 32), // 円柱
        new THREE.TorusGeometry(50, 30, 16, 100) // ドーナツ形状
    ];
    geometryList.map((geometry, index) => {
        // 形状とマテリアルからメッシュを作成
        const mesh = new THREE.Mesh(geometry, material);
        // コンテナに追加
        container.add(mesh);
        // 円周上に配置
        mesh.position.x = 400 * Math.sin(index / geometryList.length * Math.PI * 2);
        mesh.position.z = 400 * Math.cos(index / geometryList.length * Math.PI * 2);
    });

    // 初回実行
    tick();

    // 毎フレーム毎に実行されるループイベント
    function tick() {
        // コンテナ自体を回転させる
        // ※ 各形状のジオメトリが回っているように見えるが、ジオメトリはコンテナの中で止まっていてコンテナが回っている
        container.rotation.y += 0.01;

        // レンダリング
        renderer.render(scene, camera);

        // 引数の関数を毎フレーム実行する
        requestAnimationFrame(tick);
    }
}