﻿/* ===============================================================================================================================================
   toggleAlignToGlyphBounds

   Description
   This script toggles the Align panel menu > Align to Glyph Bounds > Point Text and Area Text.

   Usage
   Just run this script from File > Scripts > Other Script...

   Notes
   In rare cases, the script may not work if you continue to use it.
   In this case, restart Illustrator and try again.

   Requirements
   Illustrator 2020 or higher

   Version
   1.0.0

   Homepage
   github.com/sky-chaser-high/adobe-illustrator-scripts

   License
   Released under the MIT license.
   https://opensource.org/licenses/mit-license.php
   =============================================================================================================================================== */

(function() {
    if (app.documents.length && isValidVersion()) main();
})();


function main() {
    var pref = app.preferences;
    var glyph = pref.getBooleanPreference('EnableActualTextSpaceAlign');
    pref.setBooleanPreference('EnableActualTextSpaceAlign', !glyph);
    pref.setBooleanPreference('EnableActualAreaTextSpaceAlign', !glyph);
    showDialog(glyph);
}


function isValidVersion() {
    var cc2020 = 24.3;
    var aiVersion = parseFloat(app.version);
    if (aiVersion < cc2020) return false;
    return true;
}


function showDialog(glyph) {
    $.localize = true;
    var ui = localizeUI();

    var dialog = new Window('dialog');
    dialog.text = ui.title;
    dialog.preferredSize.width = 260;
    dialog.orientation = 'column';
    dialog.alignChildren = ['fill', 'top'];
    dialog.spacing = 10;
    dialog.margins = 16;

    var group1 = dialog.add('group', undefined, { name: 'group1' });
    group1.orientation = 'row';
    group1.alignChildren = ['center', 'center'];
    group1.spacing = 10;
    group1.margins = 20;

    var statictext1 = group1.add('statictext', undefined, undefined, { name: 'statictext1' });
    statictext1.text = glyph ? ui.off : ui.on;

    var group2 = dialog.add('group', undefined, { name: 'group2' });
    group2.orientation = 'row';
    group2.alignChildren = ['center', 'center'];
    group2.spacing = 10;
    group2.margins = 0;

    var button1 = group2.add('button', undefined, undefined, { name: 'button1' });
    button1.text = ui.ok;
    button1.preferredSize.width = 90;

    dialog.show();
}


function localizeUI() {
    var aiVersion = parseFloat(app.version);
    return {
        title: {
            en: 'Align to Glyph Bounds',
            ja: (aiVersion < 25) ? 'グリフバウンドに整列' : '字形の境界に整列'
        },
        on: {
            en: 'ON',
            ja: 'ON'
        },
        off: {
            en: 'OFF',
            ja: 'OFF'
        },
        ok: {
            en: 'OK',
            ja: 'OK'
        }
    };
}
