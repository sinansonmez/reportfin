import {MigrationInterface, QueryRunner} from "typeorm";

export class FakeReport1641902164602 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        insert into report (year, quarter, link, "bankId")
        values (1989, '3Q', 'stanford.edu', 1);
        insert into report (year, quarter, link, "bankId")
        values (2001, '3Q', 'webnode.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1992, '2Q', 'hibu.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1993, '2Q', 'amazon.co.uk', 1);
        insert into report (year, quarter, link, "bankId")
        values (2012, '2Q', 'cisco.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1993, '1Q', 'etsy.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2002, '3Q', 'delicious.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1992, '2Q', 'vkontakte.ru', 1);
        insert into report (year, quarter, link, "bankId")
        values (2000, '4Q', 'aboutads.info', 1);
        insert into report (year, quarter, link, "bankId")
        values (2002, '3Q', 'example.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2003, '1Q', 'ibm.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1992, '3Q', 'webeden.co.uk', 1);
        insert into report (year, quarter, link, "bankId")
        values (1995, '4Q', 'discovery.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2004, '3Q', 'constantcontact.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2002, '2Q', 'angelfire.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2004, '1Q', '4shared.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2009, '1Q', 'purevolume.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2005, '1Q', 'squidoo.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2006, '1Q', 'sitemeter.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2008, '3Q', 'oaic.gov.au', 1);
        insert into report (year, quarter, link, "bankId")
        values (2001, '3Q', 'wix.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2010, '2Q', 'issuu.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2010, '1Q', 'fema.gov', 1);
        insert into report (year, quarter, link, "bankId")
        values (2011, '1Q', 'amazon.co.uk', 1);
        insert into report (year, quarter, link, "bankId")
        values (2008, '3Q', 'vistaprint.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2003, '1Q', 'google.es', 1);
        insert into report (year, quarter, link, "bankId")
        values (2000, '2Q', 'si.edu', 1);
        insert into report (year, quarter, link, "bankId")
        values (2011, '3Q', 'cisco.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2009, '1Q', 'mozilla.org', 1);
        insert into report (year, quarter, link, "bankId")
        values (1993, '4Q', 'boston.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1995, '2Q', 'globo.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1993, '4Q', 'dagondesign.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2010, '3Q', 'illinois.edu', 1);
        insert into report (year, quarter, link, "bankId")
        values (2008, '4Q', 'delicious.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1998, '1Q', 'microsoft.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2006, '2Q', '123-reg.co.uk', 1);
        insert into report (year, quarter, link, "bankId")
        values (1996, '1Q', 'youku.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2004, '4Q', 'alexa.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2008, '3Q', 'discovery.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1991, '4Q', 'state.gov', 1);
        insert into report (year, quarter, link, "bankId")
        values (2010, '1Q', 'howstuffworks.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2006, '2Q', 'meetup.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2006, '3Q', 'unc.edu', 1);
        insert into report (year, quarter, link, "bankId")
        values (1971, '1Q', 'blog.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2002, '2Q', 'independent.co.uk', 1);
        insert into report (year, quarter, link, "bankId")
        values (1999, '3Q', 'google.fr', 1);
        insert into report (year, quarter, link, "bankId")
        values (2007, '3Q', 'reverbnation.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1993, '2Q', 'blogtalkradio.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2002, '1Q', 'networkadvertising.org', 1);
        insert into report (year, quarter, link, "bankId")
        values (1996, '4Q', 'twitter.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2007, '1Q', 'state.gov', 1);
        insert into report (year, quarter, link, "bankId")
        values (2001, '1Q', 'vk.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2009, '2Q', 'ca.gov', 1);
        insert into report (year, quarter, link, "bankId")
        values (1997, '3Q', 'youku.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1995, '2Q', 'ibm.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1986, '2Q', 'dion.ne.jp', 1);
        insert into report (year, quarter, link, "bankId")
        values (1999, '1Q', 'timesonline.co.uk', 1);
        insert into report (year, quarter, link, "bankId")
        values (1984, '3Q', 'free.fr', 1);
        insert into report (year, quarter, link, "bankId")
        values (1991, '3Q', 'yolasite.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2007, '1Q', 'stumbleupon.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2008, '4Q', 'pbs.org', 1);
        insert into report (year, quarter, link, "bankId")
        values (1994, '1Q', 'yellowpages.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1994, '2Q', 'amazonaws.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1992, '2Q', 'walmart.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2001, '1Q', 'wufoo.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2004, '4Q', 'microsoft.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1994, '4Q', 'fc2.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2013, '2Q', 'myspace.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1997, '2Q', 'uol.com.br', 1);
        insert into report (year, quarter, link, "bankId")
        values (2012, '1Q', 'cafepress.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1998, '1Q', 'sitemeter.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2008, '2Q', 'cdbaby.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1996, '3Q', 'prnewswire.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2008, '1Q', 'irs.gov', 1);
        insert into report (year, quarter, link, "bankId")
        values (2013, '3Q', 'house.gov', 1);
        insert into report (year, quarter, link, "bankId")
        values (2010, '4Q', 'berkeley.edu', 1);
        insert into report (year, quarter, link, "bankId")
        values (2012, '3Q', 'amazon.co.uk', 1);
        insert into report (year, quarter, link, "bankId")
        values (1995, '2Q', 'imageshack.us', 1);
        insert into report (year, quarter, link, "bankId")
        values (2011, '3Q', 'who.int', 1);
        insert into report (year, quarter, link, "bankId")
        values (2011, '4Q', 'example.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2012, '2Q', 'phoca.cz', 1);
        insert into report (year, quarter, link, "bankId")
        values (1995, '1Q', 'addthis.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1979, '1Q', 'skyrock.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1993, '2Q', 'patch.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2004, '3Q', 'patch.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1997, '1Q', 'merriam-webster.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1987, '4Q', 'jigsy.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2006, '4Q', 'godaddy.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2004, '3Q', 'chicagotribune.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2002, '3Q', 'vk.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2010, '1Q', 'tiny.cc', 1);
        insert into report (year, quarter, link, "bankId")
        values (2012, '3Q', 'disqus.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1990, '1Q', 'networksolutions.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2006, '2Q', 'fotki.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1999, '2Q', 'youku.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (2006, '4Q', '1688.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1990, '4Q', 'vinaora.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1997, '4Q', 'accuweather.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1998, '4Q', 'linkedin.com', 1);
        insert into report (year, quarter, link, "bankId")
        values (1994, '4Q', 'paypal.com', 1);
    `)
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {
    }

}
