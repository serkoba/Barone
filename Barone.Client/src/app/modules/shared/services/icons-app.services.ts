import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { Injectable } from "@angular/core";

@Injectable()
export class IconsAppServices {
    constructor(
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
    ) { }
    public setAllIcons() {
        this.iconRegistry.addSvgIcon('battery_20',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_battery_20_18px.svg'));
        this.iconRegistry.addSvgIcon('meeting_room',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/baseline-meeting_room-24px.svg'));

        this.iconRegistry.addSvgIcon('vpn_key',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_vpn_key_24px.svg'));
        this.iconRegistry.addSvgIcon('person',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_person_24px.svg'));
        this.iconRegistry.addSvgIcon('home',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_home_24px.svg'));
        this.iconRegistry.addSvgIcon('view_carousel',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_view_carousel_24px.svg'));
        this.iconRegistry.addSvgIcon('shopping_cart',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_shopping_cart_24px.svg'));
        this.iconRegistry.addSvgIcon('swap_horiz',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_swap_horiz_24px.svg'));
        this.iconRegistry.addSvgIcon('face',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_face_24px.svg'));

        this.iconRegistry.addSvgIcon('chrome_reader_mode',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_chrome_reader_mode_24px.svg'));




        this.iconRegistry.addSvgIcon('insert_invitation',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_insert_invitation_24px.svg'));
        this.iconRegistry.addSvgIcon('dvr',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_devices_24px.svg'));
        this.iconRegistry.addSvgIcon('supervisor_account',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_supervisor_account_24px.svg'));
        this.iconRegistry.addSvgIcon('attach_money',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_attach_money_24px.svg'));
        this.iconRegistry.addSvgIcon('contacts',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_contacts_24px.svg'));


        this.iconRegistry.addSvgIcon('store',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_store_24px.svg'));
        this.iconRegistry.addSvgIcon('local_shipping',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_local_shipping_24px.svg'));
        this.iconRegistry.addSvgIcon('transfer_within_a_station',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_transfer_within_a_station_24px.svg'));
        this.iconRegistry.addSvgIcon('wrap_text',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_wrap_text_24px.svg'));

        this.iconRegistry.addSvgIcon('assessment',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_assessment_24px.svg'));
        this.iconRegistry.addSvgIcon('local_library',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_local_library_24px.svg'));

        this.iconRegistry.addSvgIcon('shopping_basket',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_shopping_basket_24px.svg'));
        this.iconRegistry.addSvgIcon('extension',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_extension_24px.svg'));
        this.iconRegistry.addSvgIcon('person_big',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_person_48px.svg'));
        this.iconRegistry.addSvgIcon('whatshot',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_whatshot_24px.svg'));

        this.iconRegistry.addSvgIcon('play_circle_filled_white',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_play_circle_filled_24px.svg'));



    }
}
