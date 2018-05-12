// https://ics.media/tutorial-three/quickstart.html

window.addEventListener('load', init);

function init() {
    // サイズを指定
    const width = 960;
    const height = 540;

    // WebGLをレンダリングするためのレンダラーを生成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setPixelRatio(window.devicePixcelRatio);
    // レンダラーのサイズを変更する
    renderer.setSize(width, height);

    //// ********  上記でレンダリングするための空間？（背景？）が生成される  *******
    
    // シーンを作成
    // シーンとは3D空間のこと。この中に3Dオブジェクトや光源などを配置する。
    const scene = new THREE.Scene();

    // カメラを作成
    // どの視点からどの空間を撮影するか（表示するか）を指定する。
    // ここでは画角45, アスペクト比width/heightを指定している
    // 画角：小さいほど望遠（視野狭・遠近感小）
    // 第３引数でnear（この座標より手前は描画されない）, 第4引数でfar（この座標より奥は描画されない）の指定が可能
    const camera = new THREE.PerspectiveCamera(45, width / height);
    // カメラの座標指定（x座標, y座標, z座標）
    camera.position.set(0, 0, 1000);

    // 箱を作成
    // 立方体は「メッシュ」と呼ばれる表示オブジェクトを使用する
    // メッシュを作るにはジオメトリ（形状）とマテリアル（素材）の２種類を用意する必要がある
    // 高さ・幅・奥行きが400の箱
    const geometry = new THREE.BoxGeometry(400, 400, 400);
    // 今回は箱を表示させたいだけのため、適当なカラーを割り振るマテリアルを指定
    // ライトが必要になるが影が付くマテリアル等もある(https://ics.media/tutorial-three/material_variation.html)
    const material = new THREE.MeshNormalMaterial();
//    const material = new THREE.MeshBasicMaterial({color: 0x6699FF});  // 単色
    // ジオメトリとマテリアルを組み合わせて箱を作る
    const box = new THREE.Mesh(geometry, material);
    // シーンに追加
    scene.add(box);

    // 初回実行
    tick();

    // 毎フレーム毎に実行されるループイベント
    function tick() {
        // rotation.yプロパティを加算してオブジェクトを回転させる
        // yを増やすと縦回転になりそうだが、そうではなく、「y軸を中心として回転させる」というイメージ
        box.rotation.y += 0.01;
        // rotation.xプロパティを加算してオブジェクトを回転させる
//        box.rotation.x += 0.01;
        // rotation.zプロパティを加算してオブジェクトを回転させる
//        box.rotation.z += 0.01;
        //  x,y,zの組み合わせも可能
        // 上記は「オブジェクト名.rotation.set( x軸の回転角, y軸の回転角, z軸の回転角 );」の書き方も可能
        // レンダリング
        renderer.render(scene, camera);

        // 引数の関数を毎フレーム実行する
        requestAnimationFrame(tick);
    }
}
