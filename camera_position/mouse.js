// https://ics.media/tutorial-three/camera_position.html

window.addEventListener('load', init);

function init() {
    // サイズ指定
    const width = 960;
    const height = 540;
    // 角度指定用変数
    let rot = 0;
    // マウス座標指定
    let mouseX = 0;

    // WebGLをレンダリングするためのレンダラーを生成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height)

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // 画像付きのマテリアルを作成
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('./earthmap1k.jpg'),
        side: THREE.DoubleSide,
    });

    // 球体を作成
    const geometry = new THREE.SphereGeometry(300, 30, 30);
    // メッシュを作成
    const earchMesh = new THREE.Mesh(geometry, material);
    // シーンに追加
    scene.add(earchMesh);

    // カメラの動きがわかりやすいように星屑を作成
    createStarField();

    // マウス座標が動いたときのみ取得
    document.addEventListener('mousemove', (event) => {
        mouseX = event.pageX;
    });

    // 初回実行
    tick();

    function createStarField() {
        // 形状データを作成
        // カスタムの形状を作成するための座標点を作成するイメージ
        // 3点以上を結んで面を作ったりできる（ここではやらない）
        const geometry = new THREE.Geometry();
        for (let i = 0; i < 1000; i++) {
            geometry.vertices.push(new THREE.Vector3(
                3000 * (Math.random() - 0.5),
                3000 * (Math.random() - 0.5),
                3000 * (Math.random() - 0.5),
            ));
        }

        // マテリアルを作成
        const material = new THREE.PointsMaterial({
            size: 10,
            color: 0xFFFFFF,
        });

        // 物体を作成
        const mesh = new THREE.Points(geometry, material);
        // シーンに追加
        scene.add(mesh);
    }

    // 毎フレーム毎に実行されるループイベント
    function tick() {
        // マウスの位置に応じて角度を設定
        // マウスのX座標がステージの幅の何%の位置にあるのか調べてそれを360度で計算する
        const targetRot = (mouseX / window.innerWidth) * 360;
        // イージングの公式を用いて滑らかにする
        // イージング: エフェクトの動きを加速/減速させる、直線的でない滑らかな動きを付与したもの
        // 値 += (目標値 - 現在の値) * 減速値
        rot += (targetRot - rot) * 0.02;
        // ラジアンに変換する
        const radian = rot * Math.PI / 180;
        // 角度に応じてカメラの位置を設定
        camera.position.x = 1000 * Math.sin(radian);
        camera.position.z = 1000 * Math.cos(radian);
        // 常に原点を向く
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // レンダリング
        renderer.render(scene, camera);

        // 引数の関数を毎フレーム実行する
        requestAnimationFrame(tick);
    }
}