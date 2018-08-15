import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ivy',
  templateUrl: './ivy.component.html',
  styleUrls: ['./ivy.component.scss']
})
export class IvyComponent implements OnInit {

  public category: Category = {
    title: 'Ivy',
    unknowns: [],
    implementations: [],
    children: [],
    total: 0,
    done: 0,
  }

  public total = 0;
  public done = 0;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.http.get('https://raw.githubusercontent.com/angular/angular/master/packages/core/src/render3/STATUS.md', { responseType: 'text' }).subscribe(
      res => {
        //this.processLvl1(res);
        this.completeProcess(res);
      }
    )
  }

  private completeProcess(res) {
    let activeCategories: Category[] = [this.category];
    let currentCategoryDepth = 0;
    let activeImplemenations: Implementation[] = [];
    let lines: string[] = res.split('\n');
    let inTable = false;
    lines.forEach(line => { // FOR EACH LINE
      if (line.length > 0) {
        if (line.indexOf('|') === -1) {
          inTable = false;
        }
        if (line.match(/^#+/)) { // TITLE
          let category: Category = {
            title: line.replace(/[#]+/, ''),
            unknowns: [],
            implementations: [],
            children: [],
            total: 0,
            done: 0,
          }
          let depth = line.match(/^#+/)[0].length;
          activeCategories[depth - 1].children.push(category);
          activeCategories[depth] = category;
          currentCategoryDepth = depth;
          activeImplemenations = [];
        } else if (line.match(/^ *- (❌|✅)/)) { // BASIC IVY IMPLEMENTATION
          let regex = /^ *- *(❌|✅) */
          let resultStatusRegex = line.match(/(❌|✅)/);
          let statusString: string = resultStatusRegex ? resultStatusRegex[0] : '';
          let status: STATUS = STATUS.NA;
          switch (statusString) {
            case '❌':
              this.total++;
              activeCategories[currentCategoryDepth].total++;
              status = STATUS.FALSE;
              break;
            case '✅':
              this.total++;
              this.done++;
              activeCategories[currentCategoryDepth].total++;
              activeCategories[currentCategoryDepth].done++;
              status = STATUS.TRUE;
              break;
            default:
              status = STATUS.NA;
              break;
          }
          let implementation: Implementation = {
            title: line.replace(regex, ''),
            status: status,
            children: [],
          }
          let implementationDepth = (line.match(/ *-/)[0].length - 1) / 2;
          if (implementationDepth < 0) implementationDepth = 0;
          //console.log(implementationDepth);
          if (implementationDepth == 0) {
            activeCategories[currentCategoryDepth].implementations.push(implementation);
          } else {
            activeImplemenations[implementationDepth - 1].children.push(implementation);
          }
          activeImplemenations[implementationDepth] = implementation;
        } else if (line.indexOf('|') === 0) { // TABLE ELEMENT
          if (!inTable) { // TABLE HEADER
            inTable = true;
            activeCategories[currentCategoryDepth].tableHeaders = line.split(' |').map((cell, id) => {
              if (id === 0) {
                cell = cell.substring(1, cell.length - 1);
              }
              return cell;
            });
            activeCategories[currentCategoryDepth].tableRows = [];
          } else {
            let regex_headerLine = /^[|][^a-z]*[|]$/;
            if (!line.match(regex_headerLine)) { // TABLE ROW
              activeCategories[currentCategoryDepth].tableRows.push(line.split(' |').map(
                (cell, id) => {
                  if (id === 0) {
                    cell = cell.substring(1, cell.length);
                  }
                  if (cell.indexOf('✅') != -1) {
                    this.total++;
                    this.done++;
                    activeCategories[currentCategoryDepth].total++;
                    activeCategories[currentCategoryDepth].done++;
                  } else if (cell.indexOf('❌') != -1) {
                    this.total++;
                    activeCategories[currentCategoryDepth].total++;
                  }
                  return cell;
                })
              )
            }
          }
        } else {
          activeCategories[currentCategoryDepth].unknowns.push(line);
        }
      }
    })
  }
}
export interface Category {
  title: string;
  unknowns: string[];
  implementations: Implementation[],
  tableHeaders?: string[],
  tableRows?: string[][],
  children: Category[],
  total: number,
  done: number,
}

export interface Implementation {
  title: string,
  status: STATUS,
  children: Implementation[],
}

export enum STATUS {
  NA, TRUE, FALSE,
}