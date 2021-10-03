package com.doole.doole;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.community.firebaseanalytics.FirebaseAnalytics;
import java.util.ArrayList;
import ch.byrds.capacitor.contacts.Contacts;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Ex: add(TotallyAwesomePlugin.class);
      // Additional plugins you've installed go here
      add(FirebaseAnalytics.class);
      add(Contacts.class);
    }});
  }
}
