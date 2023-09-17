$(() => {
    // ボタンアニメーション
    $('.button-more').on('mouseover', (e) => {
        $(e.target).animate({
            opacity: 0.5,
            marginLeft: 20,
        },100);
    });
    // マウスが離れたら元に戻す
    $('.button-more').on('mouseout',(e) => {
        $(e.target).animate({
            opacity: 1.0,
            marginLeft: 0
        },100);
    });

    // カルーセル(画像をスライドさせる)
    $('.carousel').slick({
        autoplay: true,
        dots: true,
        infinite: true,
        autoplaySpeed: 5000,
        arrows: false,
    });

    // フォームの入力チェック
    const inputCheck = () => {
        // エラーチェックの結果
        let result;
        // エラーメッセージのテキスト
        let message = '';
        // エラーがなければfalse、あればtrue
        let error = false;

        // お名前のチェック
        if ($('#name').val() == '') {
            //エラーあり
            $('#name').css('background-color', '#f79999');
            error = true;
            message += 'お名前を入力してください。\n';
        } else {
            //エラーなし
            $('#name').css('background-color', '#fafafa');
        }

        // フリガナのチェック
        if ($('#furigana').val() == '') {
            // エラーあり
            $('#furigana').css('background-color', '#f79999');
            error = true;
            message += 'フリガナを入力してください。\n';
        } else {
            // エラーなし
            $('#furigana').css('background-color', '#fafafa');
        }
    
        // お問い合わせのチェック
        if ($('#message').val() == '') {
            // エラーあり
            $('#message').css('background-color', '#f79999');
            error = true;
            message += 'お問い合わせ内容を入力してください。\n';
        } else {
            // エラーなし
            $('#message').css('background-color', '#fafafa');
        }

        //都道府県チェック
        // セレクタを変数に格納
        const prefecture = $('#prefecture');
        // 都道府県の値を取得し、変数に格納
        const prefectureVal = prefecture.val();
        if(prefectureVal === ''){
            // 都道府県が選択されていなかった場合
            prefecture.css('background-color', '#f79999');
            error = true;
            message += '都道府県を選択してください\n';
        } else {
            prefecture.css('background-color', '#fafafa');
        }

        // メールアドレスのチェック
        if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {
            // エラーあり
            $('#email').css('background-color', '#f79999');
            error = true;
            message += 'メールアドレスが未記入、または「@」「.」が含まれていません。\n';
        } else {
            // エラーなし
            $('#email').css('background-color', '#fafafa');
        }

        // 電話番号チェック
        if($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1){
            // エラーあり
            $('#tel').css('background-color', '#f79999');
            error = true;
            message += '電話番号に「-」が含まれていません。\n';
        } else {
            // エラーなし
            $('#tel').css('background-color', '#fafafa');
        }

        // 個人情報のチェックボックスのチェック
        if($('agree').prop('checked') == false){
            error = true;
            message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
        }

        // エラーの有無で送信ボタンを切り替え
        if (error == true) {
            $('#submit').attr('src', 'images/button-submit.png');
        } else {
            $('#submit').attr('src', 'images/button-submit-blue.png');
        }

         // オブジェクトでエラー判定とメッセージを返す
        result = {
            error: error,
            message: message
        }

        // 戻り値としてエラーがあるかどうかを返す
        return result;
    }

    $('#submit').on('click', (e) => {
        // フォームタグによる送信を拒否
        e.preventDefault();

        // 入力チェックをした結果、エラーがあるかないか判定
        let result = inputCheck();

        // エラー判定とメッセージを取得
        let error = result.error;
        let message = result.message;

        if (error){
            alert(message);
        }
        else{
            $.ajax({
                url: 'https://api.staticforms.xyz/submit',
                type: 'POST',
                dataType: 'json',
                data: $('#form').serialize(),
                success: function(result) {
                    alert('お問い合わせを送信しました。')
                },
                error: function(xhr,resp,text){
                    alert('お問い合わせを送信できませんでした。')
                }
            });
        }
    });

    // フォーカスが外れたとき（blur）にフォームの入力チェックをする
    $('#name,#furigana,#email,#tel,#message,#prefecture').on('blur',(e) => {
        inputCheck();
    });

    $('#agree').click(function (e) {
        inputCheck();
    });
});