import {MigrationInterface, QueryRunner} from "typeorm";

export class FakeReport1641937465490 implements MigrationInterface {

  public async up(_queryRunner: QueryRunner): Promise<void> {
    /*await queryRunner.query(`
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1988, '1Q', 'ycombinator.com/orci/luctus/et/ultrices.jpg', 1, '2021-09-07T13:07:05Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1995, '2Q', 'yolasite.com/congue/diam/id/ornare/imperdiet.jpg', 1, '2021-05-13T02:39:58Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2012, '3Q', 'unc.edu/varius/ut.png', 1, '2021-08-06T03:52:11Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1994, '3Q', 'ted.com/duis.xml', 1, '2021-10-14T10:54:54Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2001, '2Q', 'de.vu/ut/volutpat/sapien/arcu/sed.json', 1, '2021-05-13T02:07:12Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1998, '3Q', 'dailymotion.com/penatibus.js', 1, '2021-02-06T00:08:03Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2007, '3Q', 'yellowbook.com/in/libero/ut/massa/volutpat/convallis.png', 1, '2021-08-09T05:32:48Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1992, '2Q', 'mysql.com/mi/pede.png', 1, '2021-08-21T12:06:40Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1989, '3Q', 'msn.com/elit.xml', 1, '2021-03-04T16:55:21Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1986, '2Q', 'squidoo.com/hac.jpg', 1, '2021-09-23T05:23:22Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1995, '2Q', 'themeforest.net/bibendum.js', 1, '2021-09-13T12:45:51Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2008, '4Q', 'list-manage.com/parturient.html', 1, '2021-02-02T19:48:39Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2010, '2Q', 'wufoo.com/nisi/eu/orci/mauris/lacinia/sapien/quis.png', 1, '2021-04-17T07:23:40Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1984, '1Q', 'rediff.com/hac/habitasse/platea/dictumst/maecenas/ut.xml', 1, '2021-08-29T20:49:27Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2012, '4Q', 'timesonline.co.uk/maecenas/tristique/est.js', 1, '2021-07-13T14:57:33Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1993, '3Q', 'accuweather.com/nec.jsp', 1, '2021-08-29T10:56:43Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2002, '4Q', 'scribd.com/mauris/non/ligula.js', 1, '2021-08-22T05:27:53Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2000, '4Q', 'woothemes.com/massa/id/lobortis.js', 1, '2021-12-31T01:02:28Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2004, '3Q', 'yelp.com/ac/nibh/fusce/lacus.png', 1, '2021-03-25T22:55:41Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1991, '1Q', 'cbslocal.com/magna/at/nunc.json', 1, '2021-06-10T06:20:50Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1999, '4Q', 'nydailynews.com/ut/suscipit/a/feugiat.aspx', 1, '2021-09-25T21:06:09Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1992, '3Q', 'usnews.com/dui/vel/sem/sed.aspx', 1, '2022-01-09T01:35:02Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2009, '4Q', 'microsoft.com/neque/aenean/auctor/gravida.xml', 1, '2021-10-29T14:20:52Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1968, '1Q', 'ucla.edu/justo.xml', 1, '2021-09-26T04:47:05Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1992, '1Q', 'answers.com/id/ornare/imperdiet/sapien/urna.jpg', 1, '2021-02-28T15:40:04Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1990, '2Q', 'yahoo.co.jp/mauris/non/ligula/pellentesque.json', 1, '2021-02-03T13:32:32Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1995, '2Q', 'auda.org.au/fusce/lacus/purus.xml', 1, '2021-02-23T15:02:51Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2008, '4Q', 'amazon.com/lacinia/sapien/quis/libero/nullam.json', 1, '2021-06-28T12:01:41Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2011, '3Q', '123-reg.co.uk/mauris/vulputate/elementum/nullam/varius/nulla.js', 1,
                '2021-04-28T11:16:37Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1994, '3Q', 'barnesandnoble.com/varius/integer/ac/leo/pellentesque/ultrices.aspx', 1,
                '2021-10-15T11:42:14Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1990, '4Q', 'globo.com/pede/lobortis/ligula.js', 1, '2021-06-14T12:05:24Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1993, '4Q', 'wordpress.com/magnis/dis/parturient/montes/nascetur/ridiculus/mus.aspx', 1,
                '2021-10-20T23:30:08Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1992, '3Q', 'theglobeandmail.com/sit/amet/cursus.jpg', 1, '2021-12-28T06:07:45Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1970, '2Q', 'aol.com/donec/vitae.jpg', 1, '2021-05-21T11:38:53Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2006, '1Q', 'reference.com/ligula/vehicula/consequat.png', 1, '2021-06-22T11:31:15Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1999, '4Q', 'ebay.co.uk/quisque/arcu/libero/rutrum/ac/lobortis/vel.js', 1, '2021-05-20T17:31:59Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1979, '4Q', 'youku.com/aenean/auctor/gravida.js', 1, '2021-02-09T11:32:18Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2012, '2Q', 'diigo.com/convallis/nulla/neque/libero/convallis.aspx', 1, '2021-07-27T04:25:07Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1993, '4Q', 'bloomberg.com/vestibulum/sit/amet.js', 1, '2021-03-27T11:24:51Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1988, '4Q', 'archive.org/pede/justo/lacinia/eget/tincidunt.aspx', 1, '2021-09-26T12:14:14Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1994, '2Q', 'yelp.com/blandit/non/interdum/in/ante.js', 1, '2021-10-13T11:51:14Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1991, '1Q', 'uiuc.edu/ultrices/posuere/cubilia/curae/duis.json', 1, '2021-07-18T13:37:42Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2010, '4Q', 'europa.eu/cubilia/curae/donec/pharetra/magna/vestibulum/aliquet.aspx', 1,
                '2021-04-07T03:08:01Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2004, '1Q', 'vimeo.com/pede/posuere/nonummy/integer.aspx', 1, '2021-11-27T19:31:03Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2003, '1Q', 'omniture.com/sapien/urna/pretium/nisl/ut/volutpat.png', 1, '2021-06-08T08:57:58Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1969, '2Q', 'tmall.com/est/donec/odio/justo.js', 1, '2021-10-03T16:13:05Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2013, '2Q', 'feedburner.com/vestibulum/ac/est/lacinia.png', 1, '2021-08-04T10:29:44Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2003, '1Q', 'bloomberg.com/iaculis/congue/vivamus/metus/arcu/adipiscing.jpg', 1,
                '2021-01-31T18:59:20Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1983, '4Q', 'multiply.com/integer/tincidunt/ante/vel/ipsum/praesent/blandit.aspx', 1,
                '2021-05-14T10:35:18Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1989, '2Q', 'state.gov/arcu/libero/rutrum/ac/lobortis/vel/dapibus.xml', 1, '2021-09-02T10:48:28Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1998, '1Q', 'liveinternet.ru/ac/est.jpg', 1, '2021-09-15T11:22:27Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2005, '4Q', 'mozilla.org/aliquam/augue/quam/sollicitudin.png', 1, '2021-03-13T17:47:47Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2009, '2Q', 'google.com/aliquet/maecenas/leo/odio/condimentum/id.jsp', 1, '2021-07-28T00:32:34Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2003, '4Q', 'etsy.com/congue/risus/semper/porta.json', 1, '2022-01-03T17:17:39Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1988, '3Q', 'apple.com/vestibulum/vestibulum/ante/ipsum/primis/in.json', 1, '2021-07-06T18:18:56Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2010, '1Q', 'ucla.edu/erat/id/mauris.jsp', 1, '2021-11-15T14:20:19Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1999, '1Q', 'economist.com/vivamus/in/felis/eu/sapien/cursus.json', 1, '2021-05-11T13:25:28Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1986, '2Q', 'marketwatch.com/commodo/vulputate/justo/in/blandit/ultrices.jpg', 1,
                '2021-01-18T08:34:21Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2008, '2Q', 'bbc.co.uk/congue/risus/semper/porta.json', 1, '2022-01-02T16:59:31Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2004, '4Q', 'sbwire.com/in/faucibus/orci/luctus/et/ultrices/posuere.js', 1, '2021-11-24T19:39:10Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2003, '3Q', 'smh.com.au/quisque.json', 1, '2021-06-28T00:50:42Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1964, '1Q', 'usgs.gov/convallis.html', 1, '2021-07-19T09:01:54Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1988, '1Q', 'google.fr/aliquet/maecenas/leo/odio/condimentum.jpg', 1, '2021-02-11T16:55:14Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2010, '4Q', 'umn.edu/venenatis.html', 1, '2021-03-16T00:41:44Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2012, '3Q', 'pen.io/pharetra/magna/ac/consequat.json', 1, '2021-12-26T12:49:56Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2012, '1Q', 'live.com/aliquet/massa/id/lobortis/convallis/tortor.json', 1, '2021-09-06T04:56:36Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2010, '2Q', 'webnode.com/nunc/viverra/dapibus/nulla/suscipit.jpg', 1, '2021-11-08T14:47:06Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1986, '2Q', 'indiegogo.com/mauris/morbi/non/lectus/aliquam/sit/amet.jsp', 1, '2021-09-15T04:25:12Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2005, '2Q', 'omniture.com/nisi/nam/ultrices.js', 1, '2021-08-05T21:50:18Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2010, '1Q', 'nifty.com/ut/nulla/sed/accumsan.html', 1, '2021-06-16T11:56:00Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2009, '2Q', 'ezinearticles.com/amet.js', 1, '2021-07-28T18:28:41Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2007, '1Q', 'nih.gov/quam.json', 1, '2021-12-17T10:48:22Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1992, '4Q', 'berkeley.edu/vestibulum/proin/eu/mi/nulla/ac/enim.js', 1, '2021-06-27T05:40:25Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2010, '4Q', 'pinterest.com/lacus/purus/aliquet/at.aspx', 1, '2021-09-17T19:25:41Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2008, '3Q', 'usda.gov/orci/luctus/et/ultrices/posuere/cubilia.aspx', 1, '2021-10-20T17:03:17Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1992, '1Q', 'amazon.co.jp/lacinia/eget/tincidunt.jpg', 1, '2021-09-06T15:31:09Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2004, '1Q', 'blogtalkradio.com/aliquam/sit/amet/diam/in.aspx', 1, '2021-09-10T07:26:24Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2001, '2Q', 'constantcontact.com/sagittis/nam/congue.html', 1, '2021-06-03T21:54:02Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2011, '2Q', 'youku.com/tortor/risus/dapibus/augue/vel/accumsan/tellus.jsp', 1, '2021-10-11T06:39:22Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1995, '3Q', 'ifeng.com/adipiscing/lorem/vitae/mattis.json', 1, '2021-03-13T19:12:22Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2002, '3Q', 'youku.com/in/faucibus/orci/luctus/et.html', 1, '2022-01-06T07:44:45Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1985, '4Q', 'amazon.de/elementum.aspx', 1, '2021-09-12T14:26:40Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2003, '3Q', 'youtube.com/mattis/pulvinar/nulla/pede/ullamcorper/augue.js', 1, '2021-09-28T00:53:21Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1994, '1Q', 'myspace.com/justo/eu.html', 1, '2021-08-12T11:45:07Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2011, '3Q', 'xrea.com/eleifend/pede/libero/quis/orci/nullam/molestie.aspx', 1, '2021-10-20T18:41:34Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2004, '4Q', 'timesonline.co.uk/consequat.json', 1, '2021-12-21T13:25:36Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1997, '4Q', 'newyorker.com/felis/sed/interdum/venenatis/turpis/enim/blandit.json', 1,
                '2021-01-28T16:06:50Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2012, '4Q', 'google.fr/porttitor/lacus/at.json', 1, '2021-04-08T12:46:45Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1988, '1Q', 'salon.com/eu/interdum/eu/tincidunt.json', 1, '2021-06-17T14:06:06Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2012, '4Q', 'mysql.com/mauris/lacinia/sapien/quis/libero/nullam.html', 1, '2021-09-18T17:00:04Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1993, '1Q', 'house.gov/lacinia/aenean/sit/amet/justo.aspx', 1, '2021-06-14T11:11:31Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2010, '3Q', 'woothemes.com/at/feugiat/non/pretium.png', 1, '2021-06-30T16:49:33Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1997, '4Q', 'google.fr/lacus/at/velit/vivamus.html', 1, '2021-07-20T20:46:11Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2011, '4Q', 'surveymonkey.com/non/velit/donec/diam.html', 1, '2021-12-18T05:10:57Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2012, '2Q', 'unesco.org/nunc/vestibulum/ante/ipsum/primis/in/faucibus.aspx', 1, '2021-02-24T23:12:49Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1995, '2Q', 'hhs.gov/eu.jpg', 1, '2021-12-27T16:08:41Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1996, '1Q', 'wikipedia.org/sapien/in/sapien/iaculis/congue.json', 1, '2021-01-26T21:10:43Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1992, '2Q', 'illinois.edu/at/vulputate/vitae/nisl.jpg', 1, '2021-09-06T23:36:19Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (2012, '1Q', 'webmd.com/diam/vitae/quam/suspendisse.jpg', 1, '2021-12-04T02:33:57Z');
        insert into report (year, quarter, link, "bankId", "createdAt")
        values (1985, '2Q', 'time.com/pulvinar/lobortis.js', 1, '2021-08-08T22:52:49Z');

    `)*/
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
  }

}
