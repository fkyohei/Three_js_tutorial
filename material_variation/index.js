// https://ics.media/tutorial-three/material_variation.html

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
    camera.position.set(0, 0, +1000);

    // ドーナツを作成
    const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
    
    // マテリアルを作成
    // MeshBasicMaterialはライティングを考慮しないマテリアル
    // 影のつかない均一な塗りつぶし状態となる
    // 開発中の動作確認等に便利
//    const material = new THREE.MeshBasicMaterial({color: 0x6699FF});
    // MeshNormalMaterialはRGBで可視化するマテリアル
    // ライティングを必要とせず、開発中の動作確認等に便利
//    const material = new THREE.MeshNormalMaterial();
    // MeshLambertMaterialはランバート・シェーディングという光沢感のないマットな質感を表現できるマテリアル
    // 影が出るため奥行き感が表現可能
    // 陰影が必要のためライトが必要となる
//    const material = new THREE.MeshLambertMaterial({color: 0x6699FF});
    // MeshPhongMaterialはフォン・シェーディングという光沢感のある質感を表現できるマテリアル
    const material = new THREE.MeshPhongMaterial({color: 0x6699FF});

    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material);
    // 追加
    scene.add(mesh);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // ポイント光源
    const pointLight = new THREE.PointLight(0xFFFFFF, 2, 1000);
    scene.add(pointLight);
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
    scene.add(pointLightHelper);

    // 初回実行
    tick();

    // 毎フレーム毎に実行されるループイベント
    function tick() {
        // メッシュを回転させる
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        // レンダリング
        renderer.render(scene, camera);

        // 引数の関数を毎フレーム実行する
        requestAnimationFrame(tick);
    }
}
