import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'help-message',
  template: `
    <div style="width: 500px; height: 250px; background: lightblue; opacity: 0.7">
        <ol>
            <li>메뉴설명<br />
                - 홈메뉴: New Pizza : 피자를 새로 생성할 수 있음.<br />
                - 하단의 토핑버튼 : 추가할 토핑을 선택함.<br />
                - 좌측상단 토핑버튼 : 선택한 토핑이며 버튼의 오른쪽의 숫자는 토핑 <br/>
                &nbsp;&nbsp;이 선택된 단계를 의미함.&nbsp;5단계 까지 표시됨.<br />
                - 좌측상단 토핑버튼 : 버튼을 클릭하면 추가된 토핑이 제거됨<br/>
                &nbsp;&nbsp;(단계가 줄어듬).<br />
                - Create Pizza : 피자를 새로 생성함.<br/>
                - Save changes : 선택한 토핑 정보를 저장함.<br/>
                - Delete Pizza : 생성된 피자를 목록에서 제거함.<br/>
            </li><br/>

        </ol>
    
    </div>
  `,
  styles: [`
      :host {
          display: block;
      }
    
  `]
})
export class HelpMessageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }
}
