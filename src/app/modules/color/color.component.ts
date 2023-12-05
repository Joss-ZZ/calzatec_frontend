import { Component, OnInit } from '@angular/core';
import { AlertService } from '@calzatec/core/service/alert/alert.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  standalone: true
})
export class ColorComponent implements OnInit {
  constructor(private readonly _alertService: AlertService) {}

  ngOnInit() {
    this._alertService.confirm({
      title: 'Terst',
      message:
        'lorem djdksd sdjsdsdsjds dsjdsk tetgdgh sdhs sjhsd sdhds sdjhsddb sdjhds dsjdhsd sd'
    });
  }
}
