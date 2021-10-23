import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PROGRAM_CONFIGS } from '@heavy-duty/ng-anchor';
import { WALLET_CONFIG } from '@heavy-duty/wallet-adapter';
import { WalletAdapterUiModule } from '@heavy-duty/wallet-adapter-ui';
import { ReactiveComponentModule } from '@ngrx/component';
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
} from '@solana/wallet-adapter-wallets';
import { environment } from 'src/environments/environment';

import * as counterIdl from '../assets/json/counter.json';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    ReactiveComponentModule,
    WalletAdapterUiModule,
  ],
  providers: [
    {
      provide: WALLET_CONFIG,
      useValue: {
        wallets: [
          getPhantomWallet(),
          getSlopeWallet(),
          getSolletWallet(),
          getSolflareWallet(),
        ],
        autoConnect: true,
      },
    },
    {
      provide: PROGRAM_CONFIGS,
      useValue: {
        counter: {
          id: environment.counterProgramId,
          idl: counterIdl,
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
