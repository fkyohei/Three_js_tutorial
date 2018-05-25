// https://ics.media/tutorial-three/material_basic.html

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
    // 第３引数でnear（この座標より手前は描画されない）, 第4引数でfar（この座標より奥は描画されない）の指定が可能
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    // カメラの座標指定（x座標, y座標, z座標）
    camera.position.set(0, 0, 1000);

    //// ****** ここから上はquickstartと同じ（カメラの引数のみ若干異なる） ******


    //// ****** ここから基本マテリアル ******
/* */
    // 球体を作成
    // 立方体と使うメソッドが違うだけで考え方は同じ
    // ジオメトリとマテリアルからメッシュを作成する
    // 引数は半径, 経度分割数（経線の細さ）, 緯度分割数（緯線の細さ）
    // 経度分割線と緯度分割線は滑らかさ
    // 3Dで表示する場合表示オブジェクトをポリゴン化（多角形）で表示させているため、
    // 分割数を上げると曲線に近くなるため滑らかに見える様になる
    const geometry = new THREE.SphereGeometry(300, 30, 30);
    const material = new THREE.MeshStandardMaterial({color: 0xFF0000});
    // const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    // シーンに追加
    scene.add(mesh);

    // 平行光源
    // 陰影を付けるために指定の位置に光源を置く
    // THREE.DirectionalLightは指定した方向から平行に光が到達するライトを適用
    // THREE.AmbientLightは環境光と呼ばれ、空間全体を均等に照らすライト（全体を照らすため座標指定は不要）
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
    // const ambientLight = new THREE.AmbientLight();
    // シーンに追加
    scene.add(directionalLight);
    // scene.add(ambientLight);
/* */
    //// ****** ここまで基本マテリアル ******


    //// ****** ここから画像付きマテリアル ******

    // 使用できる画像はGPUの制約から2の累乗の高さ・幅のもののみ使用できる
/*
    // 球体を作成
    const geometry = new THREE.SphereGeometry(300, 30, 30)
    // 画像を読み込む
    // chromeだとローカルの画像読み込みはエラーになるためfirefox等を使用しないと確認できない。サーバ作れば解決
    const loader = new THREE.TextureLoader();
    const texture = loader.load('./earthmap1k.jpg');
    // マテリアルにテキスチャーを設定
    const material = new THREE.MeshStandardMaterial({
        map: texture
    });
    // 上をまとめて下記のように書くことも可能
    // const material = new THREE.MeshStandardMaterial({
    //   map: new THREE.TextureLoader().load('./earthmap1k.jpg')
    // });
    const mesh = new THREE.Mesh(geometry, material);
    // シーンに追加
    scene.add(mesh);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
    // シーンに追加
    scene.add(directionalLight);
*/
    //// ****** ここまで画像付きマテリアル ******


    // 初回実行
    tick();

    // 毎フレーム毎に実行されるループイベント
    function tick() {
        // メッシュを回転させる
        mesh.rotation.y += 0.01;

        // レンダリング
        renderer.render(scene, camera);

        // 引数の関数を毎フレーム実行する
        requestAnimationFrame(tick);
    }
}