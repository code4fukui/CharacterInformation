# CharacterInformation.txt  
文字情報定義ファイル
======================
主に日本(語)で使用する漢字について、JIS水準などの情報を記述した定義ファイルです。  

用途
------
Unicodeコードポイントをキーにして、  
１、JIS X 0213:2004を基準とした水準の判定  
２、常用漢字の判定  
３、人名用漢字の判定  
４、常用漢字の異体字の判定  
５、子の名に使える非漢字の判定  
６、e-Tax使用可能文字の判定  
７、小学校学年別漢字(2017年版、1026文字)の判定  
が行えます。  

使い方
------
定義ファイルを読み込むC#版のサンプルがあります  

方針や注意点など
------
将来、列が増える可能性があるため、本ファイルを処理するプログラムなどは列の増加に対応できるようにしておいてください。  
無効となる列も出てくるかもしれませんが、その場合は無効列として残します。  
本ファイルの誤記修正や列の追加のような、既存プログラムを改修しなくても済む修正についてはマイナーバージョンを増やします。  
既存プログラムの改修が必要になる修正が行われたときはメジャーバージョンを増やし、マイナーバージョンを0に戻します。  
できるだけ前方互換性の確保に努めます。  
レコード内の項目の説明はファイルの先頭に記述してあります。  
メジャーバージョン毎にフォルダを分けて管理しています。  

ライセンス
------
The MIT License (MIT)  
以下に定める条件に従い、本ソフトウェアおよび関連文書のファイル（以下「ソフトウェア」）の複製を取得するすべての人に対し、ソフトウェアを無制限に扱うことを無償で許可します。これには、ソフトウェアの複製を使用、複写、変更、結合、掲載、頒布、サブライセンス、および/または販売する権利、およびソフトウェアを提供する相手に同じことを許可する権利も無制限に含まれます。  
上記の著作権表示および本許諾表示を、ソフトウェアのすべての複製または重要な部分に記載するものとします。  
ソフトウェアは「現状のまま」で、明示であるか暗黙であるかを問わず、何らの保証もなく提供されます。ここでいう保証とは、商品性、特定の目的への適合性、および権利非侵害についての保証も含みますが、それに限定されるものではありません。 作者または著作権者は、契約行為、不法行為、またはそれ以外であろうと、ソフトウェアに起因または関連し、あるいはソフトウェアの使用またはその他の扱いによって生じる一切の請求、損害、その他の義務について何らの責任も負わないものとします。  
ソフトウェアには設定ファイルなども含めます。  
Copyright (c) 2019 ZZO(@68B09)  

履歴
-----
1.4 2019.04.20 ZZO(@68B09)  
　　学年別漢字配当列の追加  
  
1.3	2019.04.13 ZZO(@68B09)  
　　JIS水準-非漢字のうち下記４文字を書記素クラスタから単一文字に変更  
　　1面11区38点 U+251+300→U+1F70  
　　1面11区39点 U+251+301→U+1F71  
　　1面11区48点 U+25B+300→U+1F72  
　　1面11区49点 U+25B+301→U+1F73  
  
1.2	2019.02.22 ZZO(@68B09)  
　　e-Tax列を追加  
  
1.1	2019.02.02 ZZO(@68B09)  
　　JIS水準列に非漢字を追加  
  
1.0 2019.01.26 ZZO(@68B09)  
