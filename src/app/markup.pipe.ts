import { Pipe, PipeTransform } from '@angular/core';
import { log } from 'util';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'markup'
})
export class MarkupPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  transform(text: string, args?: any): any {
    //-------------------------------------------- matches [abc](abc)
    let regex_github_issue = /\[[^\]]*\]\[[^\]]*\]/g;
    let matches_github_issue = text.match(regex_github_issue);
    //console.log(text, matches_github_issue)
    if (matches_github_issue) {
      matches_github_issue.forEach(match => {
        if (match) {
          let parts = match.match(/\[[^\]]*\]/g);
          //console.log(parts);
          let issue_name = parts[0].substring(1, parts[0].length - 1);
          //console.log(issue_name);
          let issue_url = parts[1].substring(1, parts[1].length - 1).replace('gh', 'https://github.com/angular/angular/issues/');
          text = text.replace(match, `<a href="${issue_url}" target="blank">${issue_name}</a>`);
        }
      });
    }
    //-------------------------------------------- matches `<div>abc</div>`
    let regex_html_complex = /`<[^>]*>[^<]*<\/[^>]*>`/g;
    let matches_html_complex = text.match(regex_html_complex);
    //console.log(matches_html_complex)
    if (matches_html_complex) {
      matches_html_complex.forEach(match => {
        if (match) {
          text = text.replace(match, '`<xmp>' + match.substr(1, match.length - 2) + '</xmp>`');
        }
      });
    }
    //-------------------------------------------- matches `<div>`
    let regex_html = /`<[^>]*>`/g;
    let matches_html = text.match(regex_html);
    //console.log(matches_html)
    if (matches_html) {
      matches_html.forEach(match => {
        if (match) {
          text = text.replace(match, '`<xmp>' + match.substr(1, match.length - 2) + '</xmp>`');
        }
      });
    }
    //-------------------------------------------- matches `abc`
    let regex_code = /`[^`]+`/g
    let matches_code = text.match(regex_code);
    //console.log(matches_code)
    if (matches_code) {
      matches_code.forEach(match => {
        if (match) {
          let regex_spaces = /\s{2,}/g;
          text = text.replace(regex_spaces, ' ');
          text = text.replace(match, '<span class="code">' + match.substr(1, match.length - 2) + '</span>');
          //match = match.substring(1, match.length - 2);
        }
      });
    }
    //-------------------------------------------- matches [abc](abc)
    let regex_link = /\[[^\]]*]\([^\)]*\)/g;
    let matches_link = text.match(regex_link);
    //console.log(matches_link)
    if (matches_link) {
      matches_link.forEach(match => {
        if (match) {
          let regex_link_name = /\[[^\]]*]/g;
          let link_name = match.match(regex_link_name)[0];
          let regex_link_url = /\([^\)]*\)/g;
          let link_url = match.match(regex_link_url)[0];
          link_url = link_url.substr(1, link_url.length - 2);
          //console.log(link_url);
          if (link_url.indexOf('./') == 0) {
            link_url = link_url.replace('./', 'https://github.com/angular/angular/tree/master/packages/core/src/render3/')
          }
          text = text.replace(match, `<a href="${link_url}" target="blank">${link_name.substr(1, link_name.length - 2)}</a>`);
        }
      });
    }
    //--------------------------------------------
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

}
